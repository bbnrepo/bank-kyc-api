import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type PutObject {
		url: String!
		key: String!
	}

    input PutObjectInput {
        key: String!
		fileType: String!
    }

    type GetObject {
        url: String!
    }

	type Query {
		""" Get Presigned url """
		getObjectPresignedURL(key: String!): GetObject

		""" Get Presigned url for public repo """
		getObjectPublicPresignedURL(key: String!): GetObject
	}

    type Mutation {
		""" It allows to put object in private bucket """
		putObjectpresignedURL(input: PutObjectInput): PutObject

		""" It allows to put object in public bucket """
		putObjectPublicPresignedURL(input: PutObjectInput): PutObject
	}
`;