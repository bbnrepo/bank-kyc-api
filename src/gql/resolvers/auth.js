import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import generatePassword from 'generate-password';

import { isValidEmail, isStrongPassword } from '../../helpers/validations.js';
import { schemaStatus, emailVariablesConfig } from '../../config/appConfig.js';
import {
	inviteAdminUserEmail,
	adminUserverificationSuccessEmail,
	userResetPasswordEmail,
	userResetPasswordSuccessMail,
} from '../../helpers/mailer.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * All resolvers related to auth
 * @typedef {Object}
 */
export default {
	Query: {},
	Mutation: {
		/**
	 * It allows to users to register as long as the limit of allowed users has not been reached
	 */
		registerUser: async (parent, { input }, context) => {
			if (!input) {
				throw new UserInputError('Data provided is not valid');
			}

			if (!isValidEmail(input.email)) {
				throw new UserInputError('The email is not valid');
			}

			if (!isStrongPassword(input.password)) {
				throw new UserInputError('The password is not secure enough');
			}

			const registeredUsersCount =
				await context.di.model.Users.find().estimatedDocumentCount();

			context.di.authValidation.ensureLimitOfUsersIsNotReached(
				registeredUsersCount
			);

			const isAnEmailAlreadyRegistered = await context.di.model.Users.findOne({
				email: input.email,
			}).lean();

			if (isAnEmailAlreadyRegistered) {
				throw new UserInputError('Email already exist');
			}

			await new context.di.model.Users(input).save();

			const user = await context.di.model.Users.findOne({
				email: input.email,
			}).lean();

			return {
				token: context.di.jwt.createAuthToken(
					user.email,
					user.userRole,
					user.isActive,
					user._id
				),
			};
		},
		/**
	 * It allows to users to register as long as the limit of allowed users has not been reached
	 */
		inviteAdminUser: async (parent, { input }, context) => {
			if (!input) {
				throw new UserInputError('Data provided is not valid');
			}

			if (!isValidEmail(input.email)) {
				throw new UserInputError('The email is not valid');
			}

			const registeredUsersCount =
				await context.di.model.Users.find().estimatedDocumentCount();

			context.di.authValidation.ensureLimitOfUsersIsNotReached(
				registeredUsersCount
			);

			const isAnEmailAlreadyRegistered = await context.di.model.Users.findOne({
				email: input.email,
			}).lean();

			if (isAnEmailAlreadyRegistered) {
				throw new UserInputError('Email already exist');
			}

			const isUserRoleExist = await context.di.model.UserRoles.findById(
				input.userRole
			).lean();

			if (!isUserRoleExist) {
				throw new UserInputError('The user role is not exist');
			}

			if (isUserRoleExist && isUserRoleExist['name'] == 'super-admin') {
				throw new UserInputError('User Role not allowed to invite');
			}

			//generate password
			const options = {
				length: 8, // Length of the password
				numbers: true, // Include numbers
				symbols: true, // Include special characters
				uppercase: true, // Include uppercase letters
			};
			input.password = generatePassword.generate(options);

			let token = uuidv4();
			token = token + '--' + Math.floor(new Date().getTime() / 1000);

			input.token = token;
			input.status = schemaStatus['users']['INVITED'];
			input.userRole = isUserRoleExist['_id'];

			let currentTime = new Date().getTime();
			let updatedTime = new Date(currentTime + 3 * 24 * 60 * 60 * 1000); // adding 3 days validity of token

			await new context.di.model.Users(input).save();

			const user = await context.di.model.Users.findOne({
				email: input.email,
			}).lean();
			await new context.di.model.OTPValidation({
				email: input.email,
				otp: token,
				validity: updatedTime,
				user: user._id,
			}).save();
			try {
				await inviteAdminUserEmail(
					input.email,
					token,
					`${input.firstName} ${input.lastName}`,
					isUserRoleExist.name
				);
			} catch (error) {
				throw new Error('An error occurred while sending the admin user invitation email');
			}

			return user;
		},
		/**
	 * It allows users to authenticate. Users with property isActive with value false are not allowed to authenticate. When an user authenticates the value of lastLogin will be updated
	 */
		authUser: async (parent, { input }, context) => {
			console.log('input+++++', input);
			if (!input) {
				throw new UserInputError('Invalid credentials');
			}

			const user = await context.di.model.Users.findOne({
				email: input.email,
				status: schemaStatus['users']['ACTIVE'],
			}).populate([
				{
					path: 'userRole'
				},
			]);

			console.log('user+++', user);

			if (!user) {
				throw new UserInputError('User not found or login not allowed');
			}

			const isCorrectPassword = await bcrypt.compare(
				input.password,
				user.password
			);

			if (!isCorrectPassword) {
				throw new UserInputError('Invalid credential');
			}

			await context.di.model.Users.findOneAndUpdate(
				{ email: input.email },
				{ lastLogin: new Date().toISOString() },
				{ new: true }
			).lean();

			return {
				userId: user['_id'],
				role: user?.userRole,
				firstName: user['firstName'],
				lastName: user['lastName'],
				token: context.di.jwt.createAuthToken(
					user.email,
					user.userRole,
					user.isActive,
					user._id
				),
				status: user.status
			};
		},
		/**
	 * It allows to user to delete their account permanently (this action does not delete the records associated with the user, it only deletes their user account)
	 */
		// deleteMyUserAccount: async (parent, args, context) => {
		// 	context.di.authValidation.ensureThatUserIsLogged(context);

		// 	const user = await context.di.authValidation.getUser(context);

		// 	return context.di.model.Users.deleteOne({ _id: user._id });
		// },
		/**
	 * It allows the user to reset password
	 */
		changePassword: async (parent, { input }, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			const { _id, currentPassword, newPassword } = input;
			const user = await context.di.model.Users.findById({ _id }, 'password');
			if (!user) {
				throw new UserInputError('User not found');
			} else {
				const isMatch = await bcrypt.compare(currentPassword, user.password);
				if (!isMatch) {
					throw new UserInputError('Invalid Password');
				} else {
					user.password = newPassword;
					await user.save();
					return 'Account password changed';
				}
			}
		},

		/**
	 * It allows to verify admin user using token and reset paassword
	 */
		verifyAdminUser: async (parent, args, context) => {
			const { input } = args;
			if (!input) {
				throw new UserInputError('Data provided is not valid');
			}

			const isExist = await context.di.model.OTPValidation.findOne({
				otp: input.token,
			}).lean();

			if (!isExist) {
				throw new UserInputError('Token does not Exist');
			}

			if (isExist['status'] != schemaStatus['otpValidation']['ACTIVE']) {
				throw new UserInputError('Token already used');
			}

			//   let tokenTimestamp = parseInt(isExist["otp"].split("--")[1]);
			//   let currentTime = Math.floor(new Date().getTime() / 1000);
			//   let elapsed = currentTime - tokenTimestamp;
			//   let hours = Math.floor(elapsed / (60 * 60));

			await context.di.model.OTPValidation.findOneAndUpdate(
				{
					_id: isExist._id,
				},
				{
					status: schemaStatus['otpValidation']['INACTIVE'],
				}
			).lean();

			const user = await context.di.model.Users.findById(isExist.user);
			user.password = input.password;
			user.status = schemaStatus['users']['ACTIVE'];
			await user.save();

			try {
				await adminUserverificationSuccessEmail(
					user.email,
					`${user.firstName} ${user.lastName}`
				);
			} catch (error) {
				throw new Error('An error occurred while sending the admin user verification success email');
			}

			return user;
		},
		/**
	 * It gives the verify-link containing token via mail to reset the password
	 */
		resetPassword: async (parent, { input }, context) => {
			const { email } = input;
			let generateToken = uuidv4();
			generateToken =
				generateToken + '--' + Math.floor(new Date().getTime() / 1000);
			let name;
			const user = await context.di.model.Users.findOne({ email });
			if (!user) {
				throw new UserInputError('User not found');
			} else if (user) {
				user.resetPasswordToken = generateToken;
				name = `${user.firstName} ${user.lastName}`;
				await user.save();
			} else {
				throw new UserInputError('Wrong Email!');
			}

			try {
				await userResetPasswordEmail(email, generateToken, name, emailVariablesConfig['HOST_DEVURL']);
			} catch (error) {
				throw new Error('An error occurred while sending the user reset password email');
			}
			return {
				userId: user['_id'],
				role: user?.userRole['name'],
				firstName: user['firstName'],
				lastName: user['lastName'],
				token: generateToken,
			};
		},

		/**
	 * It gives the verify-link containing token via mail to reset the password for admin users
	 */
		resetPasswordAdminUser: async (parent, { input }, context) => {
			const { email } = input;
			let generateToken = uuidv4();
			generateToken =
				generateToken + '--' + Math.floor(new Date().getTime() / 1000);
			let name;
			const user = await context.di.model.Users.findOne({ email });
			if (!user) {
				throw new UserInputError('User not found');
			} else if (user) {
				user.resetPasswordToken = generateToken;
				name = `${user.firstName} ${user.lastName}`;
				await user.save();
			} else {
				throw new UserInputError('Wrong Email!');
			}

			try {
				await userResetPasswordEmail(email, generateToken, name, emailVariablesConfig['HOST_DEVURL']);
			} catch (error) {
				throw new Error('An error occurred while sending the user reset password email');
			}
			return {
				userId: user['_id'],
				role: user?.userRole['name'],
				firstName: user['firstName'],
				lastName: user['lastName'],
				token: generateToken,
			};
		},
		/**
	 * It allows to reset the password of user and verify with token
	 */
		resetPasswordConfirm: async (parent, { input }, context) => {
			const { resetPasswordToken, newPassword } = input;
			const user = await context.di.model.Users.findOne({
				resetPasswordToken,
			});
			if (!user) {
				throw new UserInputError('No user found or invalid token');
			} else {
				user.password = newPassword;
				user.resetPasswordToken = '';
				if (user.status === 0) {
					user.status = schemaStatus['users']['ACTIVE'];
				}
				await user.save();
			}

			//will update the teams member status for new challenges
			await context.di.model.ChallengeRegistrations.findOneAndUpdate(
				{ 'team.memberVerificationToken': resetPasswordToken }, // Filter condition
				{ $set: { 'team.$.status': 1, 'team.$.memberVerificationToken': '' } }, // Update operation
			);

			const name = `${user.firstName} ${user.lastName}`;
			try {
				await userResetPasswordSuccessMail(user.email, name);
			} catch (error) {
				console.error(error);
				throw new Error('An error occurred while sending the user reset password success email');
			}
			return 'Password reset successfully';
		},
	},
};
