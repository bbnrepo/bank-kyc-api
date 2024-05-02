import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import axios from 'axios';
import { models } from '../data/models/index.js';
import { environmentVariablesConfig, emailVariablesConfig } from '../config/appConfig.js';
import express from 'express';
const githubController = express.Router();


// Configure passport with GitHub strategy
passport.use(
	new GitHubStrategy.Strategy(
		{
			clientID: environmentVariablesConfig.githubClientId,
			clientSecret: environmentVariablesConfig.githubClientSecret,
			callbackURL: environmentVariablesConfig.githubCallBackURL,
			scope: 'user:email public_repo',
		},
		(accessToken, refreshToken, profile, cb) => {
			return cb(null, profile, accessToken, refreshToken);
		}
	)
);

// Serialize and deserialize user data
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((obj, done) => {
	done(null, obj);
});

// GitHub authentication route
githubController.get('/auth/github', passport.authenticate('github'));

// GitHub authentication callback route
githubController.get(
	'/auth/github/callback',
	passport.authenticate('github', { failureRedirect: `${emailVariablesConfig.HOST_DEVURL}/apps` }),
	async (req, res) => {
		if (res) {
			const github = {
				githubUserId: req.user.username,
				accessToken: req.authInfo,
			};
			const headers = {
				Authorization: `token ${github.accessToken}`,
			};

			// Make a request to get the authenticated user's email
			const emailResponse = await axios.get(
				'https://api.github.com/user/emails',
				{
					headers,
				}
			);

			// GitHub provides an array of emails, so you may need to loop through them to find the primary email
			const userEmail = emailResponse.data.find((email) => email.primary).email;
			let isUserExist = await models.Developers.findOne({ email:userEmail });
			if (isUserExist){		
				await models.Developers.findOneAndUpdate(
					{ email: userEmail },
					{ github },
					{ new: true }
				);
				res.redirect(`${environmentVariablesConfig.GIT_REDIRECT_UI_URI}/?id=authorization suceessful`);
			} else {
				res.redirect(`${environmentVariablesConfig.GIT_REDIRECT_UI_URI}/?id=emailMissmatch`);
			}
		}

		// Redirect or perform any other action after successful authentication
	}
);

export default githubController;
