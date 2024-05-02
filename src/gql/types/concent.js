import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type Concent {
		_id: ID
		user: User
		requestedBy: User
		status: Int
	}

	input ConcentInput {
		user: ID!
		status: Int
	}

	input UpdateConcentInput {
		status: Int
	}

	type Query {
		""" Get list of all Abilities pushed on database """
		listAllConcents: [Concent]

		""" Get list of all Abilities pushed on database """
		getConcent(_id: ID!): Concent
	}

    type Mutation {
		""" It allows to create abilities """
		createConcent(input: ConcentInput): String

		updateConcent(_id: ID!, input: UpdateConcentInput): String
	}
`;