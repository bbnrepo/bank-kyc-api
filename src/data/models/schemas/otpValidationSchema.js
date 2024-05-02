import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { schemaStatus } from '../../../config/appConfig.js';

/**
 * Groups schema
 * @constructor Groups model constructor
 */
const OTPValidationSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	otp: {
		type: String,
		required: true,
		trim: true,
	},
	validity: {
		type: Date,
		required: true,
	},
	user : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	status: {
		type: Number,
		required: true,
		default: schemaStatus['otpValidation']['ACTIVE']
	},

}, { timestamps: true });

export { OTPValidationSchema };
