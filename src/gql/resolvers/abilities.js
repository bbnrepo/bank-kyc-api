import { UserInputError } from 'apollo-server-express';

/**
 * All resolvers related to Abilities
 * @typedef {Object}
 */
export default {
	Query: {
		/**
		 * It allows to list all abilities available
		 */
		listAllAbilities:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin']);
			return context.di.model.Abilities.find().lean();
		},
		/**
		 * It allows to list all abilities available
		 */
		getAbility:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);	
			context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin']);
			return context.di.model.Abilities.findOne({ _id: args._id }).lean();
		}
	},
	Mutation: {
		/**
		 * It allows to create new ability
		 */
		createAbility: async (parent, { input }, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			context.di.authValidation.ensureThatUserIsSuperAdmin(context);
			const isNameAlreadyRegistered = await context.di.model.Abilities.findOne({ name: input.name }).lean();

			if (isNameAlreadyRegistered) {
				throw new UserInputError('Ability already exist');
			}

			await new context.di.model.Abilities(input).save();

			const ability = await context.di.model.Abilities.findOne({ name: input.name }).lean();

			return ability;
		},
		/**
		 * It allows to create new ability
		 */
		updateAbility: async (parent, args, context) => {
			const { _id, input } = args;
			if (!input) {
				throw new UserInputError('Data provided is not valid');
			}

			context.di.authValidation.ensureThatUserIsLogged(context);	
			context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin']);

			const isAbilityExists = await context.di.model.Abilities.findById(_id).lean();

			if (!isAbilityExists) {
				throw new UserInputError('Ability Not Exist');
			}

			const ability = await context.di.model.Abilities.findByIdAndUpdate(_id, input).lean();

			return ability;
		},
		/**
		 * It allows to delete abilitiy
		 */
		deleteAbility:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			context.di.authValidation.ensureThatUserIsSuperAdmin(context);
			return context.di.model.Abilities.deleteOne({ _id:  args.abilityId });
		}
	}
};
