import { UserInputError } from 'apollo-server-express';
import { awsS3VariablesConfig } from '../../config/appConfig.js';
import aws from 'aws-sdk';

aws.config.update({
	secretAccessKey: awsS3VariablesConfig.S3_SECRET_KEY,
	accessKeyId: awsS3VariablesConfig.S3_ACCESS_KEY,
	region: awsS3VariablesConfig.S3_REGION,
	signatureVersion: 'v4',
});

const s3 = new aws.S3();
/**
 * All resolvers related to Abilities
 * @typedef {Object}
 */
export default {
	Query: {
		/**
     * get prisigned url for view document
     */
		getObjectPresignedURL: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			// context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin', 'partner-admin']);
			const params = {
				Bucket: awsS3VariablesConfig.S3_BUCKET,
				Expires: 172800, //time to expire in seconds (2 days)
				Key: args.key,
			};

			let url = await s3.getSignedUrl('getObject', params);
			return { url };
		},

		/**
     * get prisigned url from public bucket for view document
     */
		getObjectPublicPresignedURL: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			// context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin', 'partner-admin']);
			const params = {
				Bucket: awsS3VariablesConfig.S3_BUCKET_PUBLIC,
				// Expires: 172800, //time to expire in seconds (2 days)
				Key: args.key,
			};

			let url = await s3.getSignedUrl('getObject', params);
			return { url };
		},
	},
	Mutation: {
		/**
     * fetch prisigned url to upload document
     */
		putObjectpresignedURL: async (parent, { input }, context) => {
			let { key, fileType } = input;
			context.di.authValidation.ensureThatUserIsLogged(context);
			// context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin', 'partner-admin']);

			// fileName = `${fileName}-${Date.now()}`;

			const params = {
				Bucket: awsS3VariablesConfig.S3_BUCKET,
				Expires: 172800, //time to expire in seconds (2 days)
				ACL: 'private',
				Key: key,
				ContentType: fileType,
			};

			let url = await s3.getSignedUrl('putObject', params);

			return { url, key };
		},
		/**
     * fetch prisigned url to upload document
     */
		putObjectPublicPresignedURL: async (parent, { input }, context) => {
			let { key, fileType } = input;
			context.di.authValidation.ensureThatUserIsLogged(context);
			// context.di.authValidation.ensureUserRole(context, ['super-admin', 'world-admin', 'partner-admin']);

			// fileName = `${fileName}-${Date.now()}`;

			const params = {
				Bucket: awsS3VariablesConfig.S3_BUCKET_PUBLIC,
				//   Expires: 172800, //time to expire in seconds (2 days)
				ACL: 'public-read',
				Key: key,
				ContentType: fileType,
			};

			let url = await s3.getSignedUrl('putObject', params);

			return { url, key };
		},
	},
};
