import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { schemaStatus } from '../../../config/appConfig.js';
/**
 * Abilities schema
 * @constructor Abilities model constructor
 */
const AbilitiesSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	abilityId: {
		type: String,
		required: false,
		trim: true,
	},
	status: {
		type: Number,
		required: true,
		default: schemaStatus['abilities']['ACTIVE']
	},
}, { timestamps: true });

export { AbilitiesSchema };
