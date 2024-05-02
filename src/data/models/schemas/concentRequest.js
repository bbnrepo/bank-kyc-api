import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { schemaStatus } from '../../../config/appConfig.js';
/**
 * Abilities schema
 * @constructor Abilities model constructor
 */
const ConcentSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	requestedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},

	status: {
		type: Number,
		required: true,
		default: schemaStatus['abilities']['ACTIVE']
	},
}, { timestamps: true });

export { ConcentSchema };
