import mongoose from 'mongoose';
import { schemaStatus } from '../../../config/appConfig.js';

const Schema = mongoose.Schema;

/**
 * User Roles schema
 * @constructor UserRoles model constructor
 * @classdesc User have below properties.
 */
const UserRolesSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: false,
		trim: true,
	},
	abilities: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'abilities',
			required: true,
		},
	],
	abilityGroups: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'abilitiesgroup',
			required: true,
		}
	],
	type: {
		type: String,
		required: true,
	},
	status: {
		type: Number,
		required: true,
		default: schemaStatus['userRoles']['ACTIVE']
	},
}, { timestamps: true });

export { UserRolesSchema };
