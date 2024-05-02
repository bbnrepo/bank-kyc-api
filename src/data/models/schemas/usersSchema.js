import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { schemaStatus } from '../../../config/appConfig.js';
const Schema = mongoose.Schema;

/**
 * Users schema
 * @constructor Users model constructor
 * @classdesc User have below properties.
 */
const UsersSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: false,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		gender: {
			type: String,
		},
		dob: {
			type: String,
			required: false,
		},

		password: {
			type: String,
			required: true,
		},
		resetPasswordToken : {
			type: String,
			required: false
		},
		userRole: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'userroles',
			required: true,
		},
		mobile: {
			type: String,
			required: false,
			// unique: true,
		},
		signupMode: {
			type: String,
			trim: true,
		},
		org: {
			type: String,
			required: false,
		},
		customerID: {
			type: String,
			required: false,
		},
		
		// organization: {
		// 	type: String,
		// 	trim: true,
		// },
		// status2FA: {
		// 	type: Boolean,
		// 	default: true,
		// },
		// deleteStatus: {
		// 	type: Boolean,
		// 	default: true,
		// },
		// profilePic: {
		// 	key: String,
		// 	originalFileName: String
		// },
		// spaces: [{
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'spaces',
		// }],
		// spaces: [{
		// 	spaceId : {
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: 'spaces',
		// 	},
		// 	spaceAccessId : {
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: 'userroles',
		// 	}
		// }],
		// entities: [{
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'entities',
		// 	// required: true,
		// }],
		// groups: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		// ref: "GroupSchema",
		// 		//   required: true,
		// 	},
		// ],
		// assetIDs: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: 'assets',
		// 		//   required: true,
		// 	},
		// ],
		// abilityGroupsId: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: 'abilitiesgroup',
		// 		//   required: true,
		// 	},
		// ],
		// isActive: {
		// 	type: Boolean,
		// 	required: true,
		// 	default: true,
		// },
		// lastLogin: {
		// 	type: Date,
		// 	required: true,
		// 	default: Date.now,
		// },
		status: {
			type: Number,
			required: true,
			default: schemaStatus['users']['INACTIVE'],
		}
		
	},
	{ timestamps: true }
);

/**
 * Hash the password of user before save on database
 */
UsersSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	bcrypt.genSalt((err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			this.password = hash;
			next();
		});
	});
});

export { UsersSchema };
