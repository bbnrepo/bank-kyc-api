import {
	AuthenticationError,
	ForbiddenError,
	ValidationError,
} from 'apollo-server-express';
import { models } from '../../data/models/index.js';
import { globalVariablesConfig } from '../../config/appConfig.js';

/**
 * Auth validations repository
 * @typedef {Object}
 */
export const authValidations = {
	/**
   * Check if the maximum limit of users has been reached. If limit is reached, it throws an error.
   * @param {number} numberOfCurrentlyUsersRegistered 	- The number of users currently registered in the service
   */
	ensureLimitOfUsersIsNotReached: (numberOfCurrentlyUsersRegistered) => {
		const usersLimit = globalVariablesConfig.limitOfUsersRegistered;
		if (usersLimit === 0) {
			return;
		}

		if (numberOfCurrentlyUsersRegistered >= usersLimit) {
			throw new ValidationError(
				'The maximum number of users allowed has been reached. You must contact the administrator of the service in order to register'
			);
		}
	},

	/**
   * Check if in Apollo Server context contains a logged user. If user is not in context, it throws an error
   * @param {Object} context 			- The context object of Apollo Server
   * @param {Object} [context.user]  	- The context object data: user data
   */
	ensureThatUserIsLogged: (context) => {
		if (!context.user) {
			throw new AuthenticationError(
				'You must be logged in to perform this action'
			);
		}
	},

	/**
   * Check if in Apollo Server context contains an user and is an teck admin. If user is not in context or user is not an tech-admin it throws an error
   * @param {Object} context 			- The context object of Apollo Server
   * @param {Object} [context.user]  	- The context object data: user data
   * @param {boolean} [context.user.userRole] 	- The context object data: user data role information
   */
	ensureThatUserIsSuperAdmin: (context) => {
		if (!context.user || context.user.userRole.name !== 'super-admin') {
			throw new ForbiddenError(
				'You must be an super admin to perform this action'
			);
		}
	},

	/**
   * Check if in Apollo Server context contains an user and is an world admin. If user is not in context or user is not an world admin it throws an error
   * @param {Object} context 					- The context object of Apollo Server
   * @param {Object} [context.user]  			- The context object data: user data
   * @param {boolean} [context.user.userRole] 	- The context object data: user data role information
   */
	ensureThatUserIsWorldAdmin: (context) => {
		if (!context.user || context.user.userRole['name'] !== 'world-admin') {
			throw new ForbiddenError(
				'You must be an world admin to perform this action'
			);
		}
	},

	/**
   * Check if in Apollo Server context contains an user and is an partner admin. If user is not in context or user is not an partner admin it throws an error
   * @param {Object} context 					- The context object of Apollo Server
   * @param {Object} [context.user]  			- The context object data: user data
   * @param {boolean} [context.user.userRole] 	- The context object data: user data role information
   */
	ensureThatUserIsPartnerAdmin: (context) => {
		if (!context.user || context.user.userRole['name'] !== 'partner-admin') {
			throw new ForbiddenError(
				'You must be an partner admin to perform this action'
			);
		}
	},

	/**
   * Check if in Apollo Server context contains an user and is an world admin. If user is not in context or user is not an world admin it throws an error
   * @param {Object} context 					- The context object of Apollo Server
   * @param {Object} [context.user]  			- The context object data: user data
   * @param {String} [context.user.userRole] 	- The context object data: user data role information
   */
	ensureUserRole: (context, userRoles) => {
		if (!context.user || (!userRoles.includes(context.user?.userRole['name']))) 
		// context.user.userRole["name"] !== "world-admin" && context.user.userRole["name"] !== "super-admin")) 
		{
			throw new ForbiddenError(
				'You must have access to perform this action'
			);
		}
	},

	/**
   * Uses the information in the Apollo Server context to retrieve the user's data from the database. If user does not exist, it throws an error.
   * @async
   * @param {Object} context 				- The context object of Apollo Server
   * @param {Object} [context.user]  		- The context object data: user data
   * @returns {User}
   */
	getUser: async (context) => {
		if (!context.user) {
			return null;
		}

		const userUUID = context.user.uuid || null;
		const user = await models.Users.findOne({ uuid: userUUID }).lean();
		if (!user) {
			throw new AuthenticationError(
				'You must be logged in to perform this action'
			);
		}

		return user;
	},
};



