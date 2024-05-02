import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { schemaStatus } from '../../../config/appConfig.js';

/**
 * Abilities Group schema
 * @constructor AbilitiesGroup model constructor
 */
const AbilityGroupsSchema = new Schema({
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
	abilityGroupId: {
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
	status: {
		type: Number,
		required: true,
		default: schemaStatus['abilityGroups']['ACTIVE']
	},
}, { timestamps: true });

export { AbilityGroupsSchema };
