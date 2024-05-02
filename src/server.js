import mongoose from 'mongoose';
import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import path from 'path';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { UserInputError } from 'apollo-server-errors';
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

import { ENVIRONMENT } from './config/environment.js';
import { environmentVariablesConfig } from './config/appConfig.js';
import { logger, endLogger } from './helpers/logger.js';
import { requestDevLogger } from './helpers/requestDevLogger.js';
import { setContext } from './gql/auth/setContext.js';
import { initTypeDefinition } from './gql/types/index.js';
import { resolvers } from './gql/resolvers/index.js';
import { getListOfIPV4Address } from './helpers/getListOfIPV4Address.js';
import routesManager from './routes/routesManager.js';

// pasport
import githubController from './controller/githubController.js';

import session from 'express-session';
import passport from 'passport';

mongoose.set('strictQuery', true);

if (
	environmentVariablesConfig.formatConnection === 'DNSseedlist' &&
  environmentVariablesConfig.mongoDNSseedlist !== ''
) {
	mongoose.connect(environmentVariablesConfig.mongoDNSseedlist);
}

const db = mongoose.connection;
db.on('error', (err) => {
	logger.error(`Connection error with database. ${err}`);
});

db.once('open', () => {
	if (environmentVariablesConfig.environment !== ENVIRONMENT.DEVELOPMENT) {
		logger.info(
			`Connected with MongoDB service (${ENVIRONMENT.PRODUCTION} mode)`
		);
	} else {
		if (
			environmentVariablesConfig.formatConnection === 'DNSseedlist' &&
      environmentVariablesConfig.mongoDNSseedlist !== ''
		) {
			logger.info(
				`Connected with MongoDB service at "${environmentVariablesConfig.mongoDNSseedlist}" using database "${environmentVariablesConfig.database}" (${ENVIRONMENT.DEVELOPMENT} mode)`
			);
		}
	}

	initApplication();
});

const initApplication = async () => {
	const app = express();
	if (environmentVariablesConfig.environment === ENVIRONMENT.PRODUCTION) {
		app.use(helmet());
	} else {
		// Allow GraphQL Playground on development environments
		app.use(
			helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })
		);
	}
	app.use(cors({ credentials: true }));
	const __dirname = path.dirname(fileURLToPath(import.meta.url));

	//render the static file for documentation
	app.use(express.static('public'));
	// app.use(graphqlUploadExpress());
	app.use(
		session({
			secret: 'SECRETEOAUTH',
			resave: true,
			saveUninitialized: true,
		})
	);

	// Initialize Passport and session middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// Use the githubController for GitHub authentication routes
	app.use(githubController);

	// Google authentication route
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		})
	);

	// Google authentication callback route
	app.get(
		'/auth/google/callback',
		passport.authenticate('google', { failureRedirect: '/login' }),
		(req, res) => {
			// Redirect or perform any other action after successful authentication
			res.redirect('/');
		}
	);

	app.get('/doc', (req, res) => {
		res.sendFile(path.join(__dirname, '../public/index.html'));
	});

	app.use(favicon(path.join(__dirname, 'public', 'bbn.png')));
	app.use('', routesManager);
	app.use(graphqlUploadExpress());
	const typeDefs = await initTypeDefinition();


	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: setContext,
		introspection: environmentVariablesConfig.environment === ENVIRONMENT.PRODUCTION ? false : true, // Set to "true" only in development mode
		includeStacktraceInErrorResponses: environmentVariablesConfig.environment === ENVIRONMENT.PRODUCTION ? false : true, // Set the custom option
		plugins: environmentVariablesConfig.environment === ENVIRONMENT.PRODUCTION ? [ApolloServerPluginLandingPageDisabled()] : [requestDevLogger, ApolloServerPluginLandingPageGraphQLPlayground()], // Log all querys and their responses. Show playground (do not use in production)
		formatError (error) {
			if (!(error.originalError instanceof UserInputError)) {
				logger.error(error.message);
			}

			return error;
		},
	});

	// app.use((err, req, res, next) => {
	// 	console.error(err.stack);
	// 	res.status(500).send('Something went wrong!');
	// });

	// Error handling middleware for GraphQL
	const graphqlErrorMiddleware = (err, req, res, next) => {
		console.error(err.stack); // Log the error for debugging purposes

		// Check if the error is a GraphQL validation or execution error
		if (err.originalError && err.originalError.isGraphQLError) {
			res.status(400).json({ error: err.message }); // Send a 400 Bad Request response
		} else {
			res.status(500).json({ error: 'Internal Server Error' }); // Send a generic 500 Internal Server Error response
		}
	};

	// Add error handling middleware to the Express app
	app.use(graphqlErrorMiddleware);

	await server.start();

	server.applyMiddleware({ app });

	app.use((req, res) => {
		res.status(404).send('404'); // eslint-disable-line no-magic-numbers
	});

	app.listen(environmentVariablesConfig.port, () => {
		getListOfIPV4Address().forEach((ip) => {
			logger.info(
				`Application running on: http://${ip}:${environmentVariablesConfig.port}`
			);
			if (environmentVariablesConfig.environment !== ENVIRONMENT.PRODUCTION) {
				logger.info(
					`GraphQL Playground running on: http://${ip}:${environmentVariablesConfig.port}${server.graphqlPath}`
				);
			}
		});
	});

	// Manage application shutdown
	process.on('SIGINT', () => {
		logger.info('Stopping application..');
		endLogger();
		process.exit();
	});

	process.on('unhandledRejection', (err, promise, res) => {
		console.error('Unhandled Rejection Occured:', err.message);
		// res.status(400).json({ error: err.message });
	});
};
