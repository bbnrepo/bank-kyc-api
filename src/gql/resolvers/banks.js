import { UserInputError } from 'apollo-server-express'

/**
* All resolvers related to Abilities Group
* @typedef {Object}
*/
export default {
	Query: {
		/**
         * It allows to list all ability group
         */
		listAllBanks: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context)
			// context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin']);

			const sortCriteria = {
				isAdmin: 'desc',
				registrationDate: 'asc'
			}
			// return context.di.model.Banks.find().sort(sortCriteria).lean();
			const user = await context.di.model.Banks.find()
			console.log(user, 'user from server')
			return user
		},
		/**
         * It allows to list all abilities available
         */
		getBank: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context)
			// context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-']);
			return context.di.model.Banks.findOne({ _id: args._id }).lean()
		}
	},
	Mutation: {
		/**
         * It allows to create new abilities Group
         */
		createBank: async (parent, { input }, context) => {
			if (!input) {
				throw new UserInputError('Data provided is not valid')
			}
			context.di.authValidation.ensureThatUserIsLogged(context)
			// context.di.authValidation.ensureThatUserIsSuperAdmin(context);

			const isAbilityAlreadyCreated = await context.di.model.Banks
				.findOne({ name: input.name })
				.lean()

			if (isAbilityAlreadyCreated) {
				throw new UserInputError('Ability Group already exist')
			}

			await new context.di.model.Banks(input).save()

			const Banks = await context.di.model.Banks
				.findOne({ name: input.name })
				.lean()

			return Banks
		},
		/**
         * It allows to update ability group
         */
		updateBank: async (parent, args, context) => {
			const { _id, input } = args
			if (!_id) {
				throw new UserInputError('Data provided is not valid')
			}

			context.di.authValidation.ensureThatUserIsLogged(context)
			// context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin']);
			const isExist = await context.di.model.Banks
				.findById(_id)
				.lean()

			if (!isExist) {
				throw new UserInputError('Abilities Group Not Exist')
			}

			const ability = await context.di.model.Banks
				.findByIdAndUpdate(_id, input)
				.lean()
			return ability
		}
		/**
         * It allows to delete Ability Group
         */
		//  deleteAbility:  async (parent, args, context) => {
		//      context.di.authValidation.ensureThatUserIsLogged(context);
		//      // context.di.authValidation.ensureThatUserIsSuperAdmin(context);
		//      return context.di.model.Banks.deleteOne({ _id:  args.Banks });
		//  }
	}
}
