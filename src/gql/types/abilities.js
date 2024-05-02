import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type Ability {
		_id: ID
		name: String
		description: String
		abilityId: String
		status: Int
	}

	input AbilityInput {
		name: String!
		description: String!
		status: Int!
		abilityId: String
	}

	type Query {
		""" Get list of all Abilities pushed on database """
		listAllAbilities: [Ability]

		""" Get list of all Abilities pushed on database """
		getAbility(_id: ID!): Ability
	}

    type Mutation {
		""" It allows to create abilities """
		createAbility(input: AbilityInput): Ability

		""" It allows users to authenticate """
		updateAbility(_id: ID!, input: AbilityInput): Ability
	}
`;