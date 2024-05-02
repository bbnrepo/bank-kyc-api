import dotenv from 'dotenv';
dotenv.config();

import { ENVIRONMENT } from './environment.js';
import { contractAbi } from './contractsAbi.js'; // Adjust the path as needed


/* Home doc */
/**
 * @file Environment variables configuration for the application
 * @see module:appConfig
 */

/* Module doc */
/**
 * Environment variables configuration for the application
 * @module appConfig
 */

const serverPortByDefault = 3000;
const limitOfUsersRegistered = 0; /* Set the value to 0 to not use the limit. Remember put the same value on the environment variables */

/**
 * Environment variables configuration
 * @readonly
 * @type {Object}
 * @property {string} formatConnection - The format of connection with MongoDB service
 * @property {string} mongoDNSseedlist - The DNSseedlist connection format
 * @property {string} dbHost - Host of the database
 * @property {string} dbPort - Port of the database
 * @property {string} database - Name of the database
 * @property {string} mongoUser - Username of MongoDB
 * @property {string} mongoPass - Password of MongoDB
 * @property {string} environment - Application execution environment
 * @property {number} port - The port for running this application
 */
export const environmentVariablesConfig = Object.freeze({
	formatConnection: process.env.MONGO_FORMAT_CONNECTION || 'standard',
	mongoDNSseedlist: process.env.MONGO_DNS_SEEDLIST_CONNECTION || '',
	environment : (process.env.ENVIRONMENT === ENVIRONMENT.DEVELOPMENT) ? ENVIRONMENT.DEVELOPMENT : (process.env.ENVIRONMENT === ENVIRONMENT.QA) ? ENVIRONMENT.QA : ENVIRONMENT.PRODUCTION,
	port: Number(process.env.PORT) || serverPortByDefault,
	githubClientId: process.env.GITHUB_CLIENT_ID,
	githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
	githubCallBackURL: process.env.GITHUB_CALLBACK_URL,
	googleClientId: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	googleCallBackURL: process.env.GOOGLE_CALLBACK_URL,
	sourceRepoOwner: process.env.SOURCE_REPO_OWNER,
	GIT_REDIRECT_UI_URI: process.env.GIT_REDIRECT_UI_URI
});

/**
 * Security variables configuration
 * @readonly
 * @type {Object}
 * @property {string} secret - Secret key for authentication
 * @property {string} timeExpiration - Expiration time for authentication tokens
 */
export const securityVariablesConfig = Object.freeze({
	secret: process.env.SECRET || 'yoursecret',
	timeExpiration: process.env.DURATION || '24h'
});

/**
 * Global variables configuration
 * @readonly
 * @type {Object}
 * @property {number} limitOfUsersRegistered - The maximum number of users that can register
 */
export const globalVariablesConfig = Object.freeze({
	limitOfUsersRegistered: Number(process.env.LIMIT_USERS_REGISTERED) || limitOfUsersRegistered
});

export const emailVariablesConfig = Object.freeze({
	HOST_DEVURL: process.env.HOST_DEVURL,
	HOST_PORTALURL: process.env.HOST_PORTALURL,
	MAILER_EMAIL: process.env.MAILER_EMAIL,
	MAILER_PASSWORD: process.env.MAILER_PASSWORD,
	MAILER_HOST: process.env.MAILER_HOST,
	MAILER_PORT: process.env.MAILER_PORT,
	MAILER_SECURE: process.env.MAILER_SECURE,
	MAILER_FROM: process.env.MAILER_FROM,

});

export const awsS3VariablesConfig = Object.freeze({
	S3_ACCESS_KEY:process.env.S3_ACCESS_KEY,
	S3_SECRET_KEY:process.env.S3_SECRET_KEY,
	S3_REGION:process.env.S3_REGION,
	S3_BUCKET:process.env.S3_BUCKET,
	S3_BUCKET_PUBLIC:process.env.S3_BUCKET_PUBLIC

});

export const web3VariablesConfig = Object.freeze({
	Private_Key:process.env.Private_Key,
	Contract_Address:process.env.Contract_Address,
	RPC:process.env.RPC,
	Contract_ABI: contractAbi
});

export const tempData = {
	profileCompletionPerCriteria: {
		'RESUME': 10,
		'EXPERIENCE': 30,
		'EDUCATION': 30,
		'PERSONAL': 30
	}
};

export const schemaStatus = {
	users: {
		'INACTIVE': 0,
		'ACTIVE': 1
	},
	abilities: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	abilityGroups: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	announcements: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	assetCategories: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	assets: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	avenues: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	avenueTypes: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	comments: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	credentials: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	credentialTypes: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	entities: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	entityTypes: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	estates: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	events: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	eventTypes: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	generalDocuments: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	groups: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	inviteUsers: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	landParcels: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	nodes: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	otpValidation: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	partnerInterests: {
		'INTERESTED': 0,
		'INVITED': 1,
		'REGISTERED': 2
	},
	partners: {
		'INACTIVE': 0,
		'ACTIVE': 1,
		'ACCOUNT_COMPLETED': 2,
		'MOU_REQUEST_RAISED': 3,
		'MOU_SIGNED': 4,
		'NOMINATION_COMPLETED': 5,
		'NODE_SETUP_COMPLETED': 6
	},
	replies: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	spaces: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	supportTickets: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	userRoles: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	jobs: {
		'INACTIVE' : 0,
		'ACTIVE' : 1
	},
	jobApplication: {
		'NOT-FIT': 0,
		'APPLIED': 1,
		'IN-REVIEW': 2,
		'SHORTLISTED': 3,
		'CLOSED':4
	},
	developers: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	developerApps: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	companyStatus: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	devEvents: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	userCredential: {
		'INACTIVE': 0,
		'DRAFTED': 1,
		'VERIFICATION_PENDING': 2,
		'ISSUED': 3,
		'TRANSFERRED': 4,
		'ACTIVE': 5,


	},
	industryVerticals: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	industryUsecases: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	usecaseModules: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	smartContracts: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	courses: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	challengesRegistration: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	challenges: {
		'DRAFT': 0,
		'LIVE': 1, //live
		'UPCOMMING': 2, //closed
		'CLOSED': 3,
	},
	certificate: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	teamMemberStatus: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	},
	partnerDocuments: {
		'INACTIVE': 0,
		'DRAFT': 1,
		'MOU_SIGNING_IN_PROGRESS': 2,
		'ACTIVE': 3,
	},
	contactStatus: {
		'INACTIVE': 0,
		'ACTIVE': 1,
	}
};
