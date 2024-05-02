import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
  type Token {
    userId: ID
    role: UserRole
    token: String
    firstName: String
    lastName: String
    status: Int
  }

  input authUser {
    email: String!
    password: String!
  }

  input ChangePasswordInput {
    _id: ID!
    currentPassword: String!
    newPassword: String!
  }

  input ResetPasswordInput {
    email: String!
  }

  input ResetPasswordConfirmInput {
    resetPasswordToken: String!
    newPassword: String!
  }

  input VerifyAdminUserInput {
    token: String!
    password: String!
  }

  input InviteAdminUserInput {
    firstName: String!
    lastName: String!
    email: String!
    userRole: ID!
  }
  input orgInput {
    org: String!
  }

  type Mutation {
    """
    It allows users to register
    """
    registerUser(input: UserInput): Token

    """
    It allows users to register
    """
    inviteAdminUser(input: InviteAdminUserInput): Token
    """
    It allows the user to reset password
    """
    verifyAdminUser(input: VerifyAdminUserInput): User

    """
    It allows users to authenticate
    """
    authUser(input: authUser): Token

    """
    It allows the user to reset password
    """
    changePassword(input: ChangePasswordInput): String

    """
    It gives the verify-link containing token via mail to reset the password
    """
    resetPassword(input: ResetPasswordInput): Token

    """
    It gives the verify-link containing token via mail to reset the password for admin
    """
    resetPasswordAdminUser(input: ResetPasswordInput): Token

    """
    It allows to reset the password
    """
    resetPasswordConfirm(input: ResetPasswordConfirmInput): String

    enrollAdminOrg(input: orgInput): String
  }
`;
