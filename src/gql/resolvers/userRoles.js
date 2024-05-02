import { UserInputError } from 'apollo-server-express';
import { schemaStatus } from '../../config/appConfig.js';

/**
 * All resolvers related to Abilities Group
 * @typedef {Object}
 */
export default {
	Query: {
		/**
		 * It allows to list all ability group
		 */
		listAllUserRoles:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);	
			context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin']);
			const user = await context.di.model.UserRoles.find().populate(
				{ path: 'abilities', select: 'name _id status' }
			);
			return user;
		},
		/**
		 * get user role by Id
		 */
		getUserRole:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);	
			context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin']);
			return context.di.model.UserRoles.findOne({ _id: args._id }).populate(
				{ path: 'abilities', select: 'name _id status' }
			).lean();
		}
	},
	Mutation: {
		/**
		 * It allows to create new user Role
		 */
		createUserRole: async (parent, { input }, context) => {

			if (!input) {
				throw new UserInputError('Data provided is not valid');
			}

			context.di.authValidation.ensureThatUserIsLogged(context);
			context.di.authValidation.ensureThatUserIsSuperAdmin(context);

			const isRoleAlreadyCreated = await context.di.model.UserRoles.findOne({ name: input.name }).lean();

			if (isRoleAlreadyCreated) {
				throw new UserInputError('Role already exist');
			}

			input.status = schemaStatus['userRoles']['ACTIVE'];
			await new context.di.model.UserRoles(input).save();

			const userRoles = await context.di.model.UserRoles.findOne({ name: input.name }).lean();

			return userRoles;
		},
		/**
		 * It allows to update user Roles
		 */
		updateUserRole: async (parent, args, context) => {
			const { _id, input } = args;
			if (!_id) {
				throw new UserInputError('Data provided is not valid');
			}
			context.di.authValidation.ensureThatUserIsLogged(context);	
			context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin']);

			const isRoleExist = await context.di.model.UserRoles.findById(_id).lean();

			if (!isRoleExist) {
				throw new UserInputError('Role Not Exist');
			}

			const role = await context.di.model.UserRoles.findByIdAndUpdate(_id, input).lean();

			return role;
		},
		/**
		 * It allows to delete Ability Group
		 */
		// deleteUserRole:  async (parent, args, context) => {
		// 	context.di.authValidation.ensureThatUserIsLogged(context);
		// 	context.di.authValidation.ensureThatUserIsSuperAdmin(context);
		// 	return context.di.model.UserRoles.deleteOne({ _id: args.userRoleId });
		// }
	}
};
