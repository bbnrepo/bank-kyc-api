import merge from 'lodash.merge'

import users from './users.js'
import auth from './auth.js'
// import abilities from './abilities.js';
// import abilitiesGroup from './abilitiesGroup.js';
import userRoles from './userRoles.js'
import awss3 from './awss3.js'
import Bank from './banks.js'

export const resolvers = merge(
	users,
	auth,
	// abilities,
	// abilitiesGroup,
	userRoles,
	awss3,
	Bank
)
