import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type AbilityGroup {
		_id:ID
		name: String
		description: String
		abilityGroupId: String
        abilities:[Ability]
		status: Int
	}

	input AbilityGroupInput {
		name: String
		description: String
		abilityGroupId: String
        abilities:[String]
		status: Int
	}

	type Query {
		""" Get list of all AbilitiesGroup pushed on database """
		listAllAbilitiesGroup: [AbilityGroup]

		""" Get list of all Abilities pushed on database """
		getAbilitiesGroup(_id: ID!): Ability
	}

    type Mutation {
		""" It allows to create abilities group """
		createAbilitiesGroup(input: AbilityGroupInput): AbilityGroup

		""" It allows to update abilities group """
		updateAbilitiesGroup(_id:String!, input: AbilityGroupInput!): AbilityGroup
	}
`;