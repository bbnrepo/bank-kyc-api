import { gql } from 'apollo-server-express'

export default /* GraphQL */ gql`
    type Bank {
        _id:ID
        name: String
        description: String
       
        status: Int
    }
 
    input BankInput {
        name: String
        description: String
       
        status: Int
    }
 
    type Query {
        """ Get list of all AbilitiesGroup pushed on database """
        listAllBanks: [Bank]
 
        """ Get list of all Abilities pushed on database """
        getBank(_id: ID!): Bank
    }
 
    type Mutation {
        """ It allows to create abilities group """
        createBank(input: BankInput): Bank
 
        """ It allows to update abilities group """
        updateBank(_id:String!, input: BankInput!): Bank
    }
`
