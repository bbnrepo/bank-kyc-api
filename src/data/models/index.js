import mongoose from 'mongoose'

import {
	AbilitiesSchema,
	AbilityGroupsSchema,
	UserRolesSchema,
	UsersSchema,
	OTPValidationSchema,
	ConcentSchema
} from './schemas/index.js'
import { BanksSchema } from './schemas/banksSchema.js'

export const models = {
  Users: mongoose.model('users', UsersSchema),
  Abilities: mongoose.model('abilities', AbilitiesSchema),
  AbilitiesGroup: mongoose.model(
		'abilitiesgroup',
		AbilityGroupsSchema
	),
  UserRoles: mongoose.model('userroles', UserRolesSchema),
  OTPValidation: mongoose.model('otpValidation', OTPValidationSchema),
  ConcentRequest: mongoose.model('concentRequest', ConcentSchema),
  Banks: mongoose.model('banks', BanksSchema)
}
