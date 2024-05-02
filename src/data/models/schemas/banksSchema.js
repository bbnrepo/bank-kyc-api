import mongoose from 'mongoose'
const Schema = mongoose.Schema
import { schemaStatus } from '../../../config/appConfig.js'

/**
* Abilities Group schema
* @constructor bank model constructor
*/
const BanksSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			required: false,
			trim: true
		},
		status: {
			type: Number,
			required: true,
			default: schemaStatus['abilityGroups']['ACTIVE']
		}
	},
	{ timestamps: true }
)

export { BanksSchema }
