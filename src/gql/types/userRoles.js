import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type UserRole {
		_id:ID
		name: String
		description: String
		type: String
		status: Int
	}

	input UserRoleInput {
		name: String!
		description: String!
		type: String!
		status: Int
	}

	type Query {
		""" Get list of all UserRole pushed on database """
		listAllUserRoles: [UserRole]

		""" Get UserRole By Id """
		getUserRole(_id: ID!): UserRole
	}

    type Mutation {
		""" It allows to create user role """
		createUserRole(input: UserRoleInput): UserRole

		""" It allows to update user role """
		updateUserRole(_id: ID!, input: UserRoleInput ): UserRole
	}
`;