import { gql } from 'apollo-server-express'

export default /* GraphQL */ gql`

  input FileKeysInput {
    key: String,
    originalFileName: String,
  }

  type FileKeys {
    key: String,
    originalFileName: String
  }

  type User {
    _id: ID!
	  org: String
    firstName: String!
    lastName: String!
    email: String
    mobile: String
    signupMode: String
    userRole: UserRole
    status: Int
    profilePic: FileKeys
		createdAt : String
		updatedAt : String
    dob: String,
    gender: String,
    customerID: String,
    kycConcent: Boolean

  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    gender: String
    password: String
    mobile: String
    userRole: String
    status: Int
	org: String
	affiliations: String
	customerID: String
	dob: String
  }


  input UpdateUserInput {
    firstName: String
    lastName: String
    mobile: String
    gender: String
    userRole: String
    status: Int
    profilePic: FileKeysInput
  }

  type Query {
    """ Get list of all users registered on database """
    listAllUsers(pageNumber:Int , pageSize:Int): [User]

    """ Get list of all users registered on database """
    listAllAdminUsers: [User]

    """ Get list of Single user registered on database """
    getUser(_id: ID): User

    """ Get Current user registered on database """
    getCurrentUser: User


  }
  type Mutation {
		""" It allows users to register """
		updateUser(_id: ID!,input: UpdateUserInput): User

		createCustomer(input: UserInput): Token
	}
`
