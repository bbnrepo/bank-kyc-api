import nodemailer from 'nodemailer';
import { emailVariablesConfig } from '../config/appConfig.js';

const transporter = nodemailer.createTransport({
	host: emailVariablesConfig.MAILER_HOST,
	port: emailVariablesConfig.MAILER_PORT,

	auth: {
		user: emailVariablesConfig.MAILER_EMAIL,
		pass: emailVariablesConfig.MAILER_PASSWORD,
	},
});

export const partnerInviteEmail = async (email, token, name) => {
	// try {
	var HOST_PORATALURL = emailVariablesConfig.HOST_PORTALURL;
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Invitation For Bharat Blockchian Network',
		html: `<div style="background-color: #f2f2f2; padding: 20px 20px; margin: 0 auto;">
            <p style="font-size: 38px; color: #061B61;margin-top:0;margin-bottom:15px">Bharat Blockchain Network Node Setup</p>
            <div style="background-color: #ffffff; padding: 20px 20px; margin: 0 ; box-shadow: 4px 6px 23px 0 rgba(202,210,224,.7), 1px 2px 4px 0 #c8d2e1;">
            <p>Hi ${name}</p>
            <p>Greetings from Bharat Blockchain Network (BBN), an initiative from IDS with the support of AICTE.</p>
            <p>Thank you for showing interest in Bharat Blockchain Network.</p>
            <div><a style="display: inline-block; font-weight: normal; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid #34bfa3; padding: 0.65rem 1.25rem; font-size: 1rem; line-height: 1.25; border-radius: 0.25rem; color: #fff; background-color: #061B61; cursor: pointer !important; text-decoration: none;" href = "${HOST_PORATALURL}/auth/register/${token}" target="_blank" rel="noopener">Confirm Email Address</a></div>
            <p>If you are unable to click on button. Please Click on given Link.</p>
            <a href= "${HOST_PORATALURL}/auth/register/${token}">${HOST_PORATALURL}/auth/register/${token}</a>
            <p><strong>If you haven&rsquo;t requested this email, there&rsquo;s nothing to worry about &ndash; you can safely ignore it.</strong><br /> Look forward to work with you,<br /> Team IDS.</p>
            </div>`,
	};

	await transporter.sendMail(mailOptions);

	// } catch (error) {
	// 	throw error;
	// }
};

export const userRegisteredEmail = async (email, name) => {
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Welcome to Bharat Blockchain Network',
		html: `<div style="background-color: #f2f2f2; padding: 20px 20px; margin: 0 auto;">
		<p style="font-size: 38px; color: #061B61;margin-top:0;margin-bottom:15px">Bharat Blockchain Network</p>
		<div style="background-color: #ffffff; padding: 20px 20px; margin: 0 ; box-shadow: 4px 6px 23px 0 rgba(202,210,224,.7), 1px 2px 4px 0 #c8d2e1;">
		<p>Hi ${name}</p>
		<p>Greetings from Bharat Blockchain Network (BBN), an initiative from IDS with the support of AICTE.</p>
		<p>Thank you for registering with Bharat Blockchain Network.</p>
		<p>We will get back to you soon with further details.</p>
		<p><strong>If you haven&rsquo;t requested this email, there&rsquo;s nothing to worry about &ndash; you can safely ignore it.</strong><br /> Look forward to work with you,<br /> Team IDS.</p>
		</div>`,
	};

	await transporter.sendMail(mailOptions);
};

export const partnerRegisteredEmail = async (email, name) => {
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Welcome to Bharat Blockchain Network',
		html: `<div style="background-color: #f2f2f2; padding: 20px 20px; margin: 0 auto;">
		<p style="font-size: 38px; color: #061B61;margin-top:0;margin-bottom:15px">Bharat Blockchain Network</p>
		<div style="background-color: #ffffff; padding: 20px 20px; margin: 0 ; box-shadow: 4px 6px 23px 0 rgba(202,210,224,.7), 1px 2px 4px 0 #c8d2e1;">
		<p>Hi ${name}</p>
		<p>Greetings from Bharat Blockchain Network (BBN), an initiative from IDS with the support of AICTE.</p>
		<p>Thank you for registering with Bharat Blockchain Network.</p>
		<p>We will get back to you soon with further details.</p>
		<p><strong>If you haven&rsquo;t requested this email, there&rsquo;s nothing to worry about &ndash; you can safely ignore it.</strong><br /> Look forward to work with you,<br /> Team IDS.</p>
		</div>`,
	};

	await transporter.sendMail(mailOptions);
};

export const partnerInterestEmail = async (email, name) => {
	// try {
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Thank you for showing interest in Bharat Blockchain Network',
		html: `<div style="background-color: #f2f2f2; padding: 20px 20px; margin: 0 auto;">
                <p style="font-size: 38px; color: #061B61;margin-top:0;margin-bottom:15px">Bharat Blockchain Network</p>
                <div style="background-color: #ffffff; padding: 20px 20px; margin: 0 ; box-shadow: 4px 6px 23px 0 rgba(202,210,224,.7), 1px 2px 4px 0 #c8d2e1;">
                <p>Hi ${name}</p>
                <p>Greetings from Bharat Blockchain Network (BBN), an initiative from IDS with the support of AICTE.</p>
                <p>Thank you for showing interest in Bharat Blockchain Network.</p>
                <p>We will get back to you soon with further details.</p>
                <p><strong>If you haven&rsquo;t requested this email, there&rsquo;s nothing to worry about &ndash; you can safely ignore it.</strong><br /> Look forward to work with you,<br /> Team IDS.</p>
                </div>`,
	};

	await transporter.sendMail(mailOptions);

	// }
	// catch (error) {
	// 	throw error;
	// }
};

export const developerVerificationEmail = async (email, token, name) => {
	var HOST_DEVURL = emailVariablesConfig.HOST_DEVURL;
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Welcome to the BBN Developer Portal - Verify Your Email',
		html: ` <!DOCTYPE html>
		<html>
		<head>
		  <title>Welcome to the BBN Developer Portal - Verify Your Email</title> 
		  <style>
			/* CSS Styling */
			@media only screen and (max-width: 600px) {
			  .container {
				width: 100% !important;
				padding: 20px !important;
			  }
			}
		
			body {
			  margin: 0;
			  padding: 0;
			  font-family: Arial, sans-serif;
			  background-color: #f2f2f2;
			}
		
			.container {
			  max-width: 600px;
			  margin: 0 auto;
			  padding: 60px 20px;
			  background-color: #ffffff;
			  border-radius: 8px;
			  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			}
		
			.header {
			  text-align: center;
			  margin-bottom: 40px;
			}
		
			.header h1 {
			  color: #333333;
			  font-size: 24px;
			  margin-top: 0;
			}
		
			.button {
			  display: inline-block;
			  padding: 12px 24px;
			  background-color: #0088cc;
			  color: #ffffff;
			  text-decoration: none;
			  border-radius: 6px;
			  transition: background-color 0.3s ease;
			  font-size: 16px;
			}
		
			.button:hover {
			  background-color: #006699;
			}
		
			.content {
			  color: #333333;
			  line-height: 1.5;
			}
		
			.signature {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 14px;
			  color: #777777;
			}
		
			.footer {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 14px;
			  color: #777777;
			}
		  </style>
		</head>
		<body>
		  <div class="container">
			<div class="header">
			  <h1>Welcome to the BBN Developer Portal</h1>
			  <img src="https://bharatblockchain.io/wp-content/uploads/2022/04/cropped-bbn-logo.png" alt="Logo" width="200">
			</div>
			<p class="content">🎉 Congratulations ${name} on signing up for the Bharat Blockchain Network Developer Portal! We are thrilled to have you join our community of developers. 🚀</p>
			<p class="content">To get started, we kindly ask you to verify your email address. This is an important step to activate your account and gain full access to our developer resources.</p>
			<p class="content" style="text-align: center;"><a class="button" href="${HOST_DEVURL}/email-verification/${token}">Verify Email</a></p>
			<p class="content">Once your email is verified, you will unlock a wealth of developer resources including comprehensive documentation, APIs, SDKs, sample code, tutorials, and access to our vibrant developer community.</p>
			<div class="signature">
			  <p>Thank you once again for joining the Bharat Blockchain Network Developer Portal. We look forward to your contributions and to witnessing the amazing solutions you'll develop.</p>
			  <p>Happy coding! 💻</p>
			  <p>Best regards,</p>
			  <p>Team BBN</p>
			</div>
			<div class="footer">
			  <p>IDS Inc.</p>
			  <p>Trendz Utility,3rd Floor, Gafoor Nagar,
		Vittal Rao Nagar Road, Madhapur,
		Hyderabad, TS – 500081</p>
			</div>
		  </div>
		</body>
		</html>
		`,
	};

	await transporter.sendMail(mailOptions);
};

export const developerVerificationSuccessEmail = async (email) => {
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Welcome to the BBN Developer Portal - Email Verified',
		html: `<!DOCTYPE html>
		<html>
		<head>
		  <title>Welcome to the BBN Developer Portal - Email Verified</title> 
		  <style>
			/* CSS Styling */
			@media only screen and (max-width: 600px) {
			  .container {
				width: 100% !important;
				padding: 20px !important;
			  }
			}
		
			body {
			  margin: 0;
			  padding: 0;
			  font-family: Arial, sans-serif;
			  background-color: #f2f2f2;
			}
		
			.container {
			  max-width: 600px;
			  margin: 0 auto;
			  padding: 60px 20px;
			  background-color: #ffffff;
			  border-radius: 8px;
			  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			}
		
			.header {
			  text-align: center;
			  margin-bottom: 40px;
			}
		
			.header h1 {
			  color: #333333;
			  font-size: 24px;
			  margin-top: 0;
			}
		
			.content {
			  color: #333333;
			  line-height: 1.5;
			}
		
			.success {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 20px;
			  color: #00cc00;
			}
		
			.footer {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 14px;
			  color: #777777;
			}
		
			.bold {
			  font-weight: bold;
			}
		
			.button-container {
			  text-align: center;
			}
		
			.button {
			  display: inline-block;
			  padding: 8px 15px;
			  background-color: #0088cc;
			  color: #ffffff;
			  text-decoration: none;
			  border-radius: 6px;
			  transition: background-color 0.3s ease;
			  font-size: 16px;
			  margin-top: 20px;
			}
		
			.button:hover {
			  background-color: #006699;
			}
		  </style>
		</head>
		<body>
		  <div class="container">
			<div class="header">
			  <h1>Welcome to the BBN Developer Portal</h1>
			  <img src="https://bharatblockchain.io/wp-content/uploads/2022/04/cropped-bbn-logo.png" alt="Logo" width="200">
			</div>
			<p class="content">🎉 Congratulations! Your email address has been successfully verified. 🎉</p>
			<p class="success">Email Verified!</p>
			<div class="button-container">
			  <a class="button" href="https://developer.bharatblockchain.io/login">Go to Developer Portal</a>
			</div>
			<p class="content">You can now enjoy full access to our developer resources, including comprehensive documentation, APIs, SDKs, sample code, tutorials, and our vibrant developer community.</p>
			<p class="content"><span class="bold">Explore the resources:</span> Once your account is verified, you'll gain access to a plethora of developer resources. Dive into our comprehensive documentation, APIs, SDKs, sample code, and tutorials to get started with developing on the Bharat Blockchain Network.</p>
			<div class="button-container">
			  <a class="button" href="https://developer.bharatblockchain.io/learn">Explore Resources</a>
			</div>
			<p class="content"><span class="bold">Build revolutionary applications:</span> With the power of the Bharat Blockchain Network at your fingertips, you have the opportunity to create groundbreaking applications, decentralized solutions, and transformative use cases. Unleash your creativity and leverage the blockchain technology to shape the future.</p>
			<p class="content"><span class="bold">Join the community:</span> Connect with a vibrant community of developers who share your passion for blockchain technology. Engage in discussions, ask questions, and exchange knowledge on our community forums. Collaborate on projects, discover new opportunities, and stay updated with the latest developments in the blockchain ecosystem.</p>
			<div class="button-container">
			  <a class="button" href="https://developer.bharatblockchain.io/join-community">Join Community</a>
			</div>
			<p class="content"><span class="bold">Get support:</span> Our dedicated support team is here to assist you on your development journey. If you encounter any challenges or have questions while working with the Bharat Blockchain Network, don't hesitate to reach out. We're committed to ensuring your success and providing prompt assistance.</p>
			<div class="button-container">
			  <a class="button" href="https://developer.bharatblockchain.io/get-support">Get Support</a>
			</div>
			<div class="footer">
			  <p>IDS Inc.</p>
			  <p>Trendz Utility, 3rd Floor, Gafoor Nagar, Vittal Rao Nagar Road, Madhapur, Hyderabad, TS – 500081</p>
			</div>
		  </div>
		</body>
		</html>
		`,
	};

	await transporter.sendMail(mailOptions);
};

export const inviteAdminUserEmail = async (email, token, name, role) => {
	var HOST_PORTALURL = emailVariablesConfig.HOST_PORTALURL;
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Welcome to the BBN Portal - Invitation Received',
		html: `<!DOCTYPE html>
		<html>
		<head>
		  <title>Welcome to the BBN Portal - Invitation Received</title> 
		  <style>
			/* CSS Styling */
			@media only screen and (max-width: 600px) {
			  .container {
				width: 100% !important;
				padding: 20px !important;
			  }
			}
		
			body {
			  margin: 0;
			  padding: 0;
			  font-family: Arial, sans-serif;
			  background-color: #f2f2f2;
			}
		
			.container {
			  max-width: 600px;
			  margin: 0 auto;
			  padding: 60px 20px;
			  background-color: #ffffff;
			  border-radius: 8px;
			  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			}
		
			.header {
			  text-align: center;
			  margin-bottom: 40px;
			}
		
			.header h1 {
			  color: #333333;
			  font-size: 24px;
			  margin-top: 0;
			}
		
			.content {
			  color: #333333;
			  line-height: 1.5;
			}
		
			.success {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 20px;
			  color: #00cc00;
			}
		
			.footer {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 14px;
			  color: #777777;
			}
		
			.bold {
			  font-weight: bold;
			}
		
			.button-container {
			  text-align: center;
			}
		
			.button {
			  display: inline-block;
			  padding: 8px 15px;
			  background-color: #0088cc;
			  color: #ffffff;
			  text-decoration: none;
			  border-radius: 6px;
			  transition: background-color 0.3s ease;
			  font-size: 16px;
			  margin-top: 20px;
			}
		
			.button:hover {
			  background-color: #006699;
			}
		  </style>
		</head>
		<body>
		  <div class="container">
			<div class="header">
			  <h1>${name} welcome to the BBN Portal</h1>
			  <img src="https://bharatblockchain.io/wp-content/uploads/2022/04/cropped-bbn-logo.png" alt="Logo" width="200">
			</div>
			<p class="content">🎉 Congratulations! You have been invited to join the BBN Portal as a <span class="bold">${role}</span>. 🎉</p>
			<p class="success">Invitation Received!</p>
			<div class="button-container">
			  <a class="button" href="${HOST_PORTALURL}/reset-password/${token}">Accept Invitation</a>
			</div>
			<p class="content">As a <span class="bold">${role}</span>, you'll have access to exclusive resources, tools, and privileges tailored to your responsibilities. </p>
			<p class="content">Accept Invitation & Set Password to activate your account. </p>
			<div class="footer">
		   
			  <p>IDS Inc.</p>
			  <p>Trendz Utility, 3rd Floor, Gafoor Nagar, Vittal Rao Nagar Road, Madhapur, Hyderabad, TS – 500081</p>
			</div>
		  </div>
		</body>
		</html>
		`,
	};

	await transporter.sendMail(mailOptions);
};

export const adminUserverificationSuccessEmail = async (email, name) => {
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Welcome to Bharat Blockchain Network',
		html: `<div style="background-color: #f2f2f2; padding: 20px 20px; margin: 0 auto;">
		<p style="font-size: 38px; color: #061B61;margin-top:0;margin-bottom:15px">Bharat Blockchain Network</p>
		<div style="background-color: #ffffff; padding: 20px 20px; margin: 0 ; box-shadow: 4px 6px 23px 0 rgba(202,210,224,.7), 1px 2px 4px 0 #c8d2e1;">
		<p>Hi ${name}</p>
		<p>Greetings from Bharat Blockchain Network (BBN), an initiative from IDS with the support of AICTE.</p>
		<p>Thank you for registering with Bharat Blockchain Network.</p>
		<p>We will get back to you soon with further details.</p>
		<p><strong>If you haven&rsquo;t requested this email, there&rsquo;s nothing to worry about &ndash; you can safely ignore it.</strong><br /> Look forward to work with you,<br /> Team IDS.</p>
		</div>`,
	};

	await transporter.sendMail(mailOptions);
};

export const userResetPasswordEmail = async (email, token, name, hostURL) => {
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'BBN Portal - Reset Password',
		html: `<!DOCTYPE html>
		<html>
		<head>
		  <title>BBN Portal - Reset Password</title>
		  <style>
			/* CSS Styling */
			@media only screen and (max-width: 600px) {
			  .container {
				width: 100% !important;
				padding: 20px !important;
			  }
			}
		
			body {
			  margin: 0;
			  padding: 0;
			  font-family: Arial, sans-serif;
			  background-color: #f2f2f2;
			}
		
			.container {
			  max-width: 600px;
			  margin: 0 auto;
			  padding: 60px 20px;
			  background-color: #ffffff;
			  border-radius: 8px;
			  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			}
		
			.header {
			  text-align: center;
			  margin-bottom: 40px;
			}
		
			.header h1 {
			  color: #333333;
			  font-size: 24px;
			  margin-top: 0;
			}
		
			.content {
			  color: #333333;
			  line-height: 1.5;
			}
		
			.success {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 20px;
			  color: #00cc00;
			}
		
			.footer {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 14px;
			  color: #777777;
			}
		
			.bold {
			  font-weight: bold;
			}
		
			.button-container {
			  text-align: center;
			}
		
			.button {
			  display: inline-block;
			  padding: 8px 15px;
			  background-color: #0088cc;
			  color: #ffffff;
			  text-decoration: none;
			  border-radius: 6px;
			  transition: background-color 0.3s ease;
			  font-size: 16px;
			  margin-top: 20px;
			}
		
			.button:hover {
			  background-color: #006699;
			}
		
			.emoji {
			  font-size: 20px;
			  margin-right: 5px;
			}
		  </style>
		</head>
		<body>
		  <div class="container">
			<div class="header">
			  <h1>BBN Portal</h1>
			  <img src="https://bharatblockchain.io/wp-content/uploads/2022/04/cropped-bbn-logo.png" alt="Logo" width="200">
			</div>
			<p class="content">Hi ${name}</p>
			<p class="content">🔒 Forgot your password? No worries! 🔒</p>
			<p class="success">🔑 Reset Password 🔑</p>
			<div class="button-container">
			  <a class="button" href="${hostURL}/reset-password/${token}">🔓 Reset Password</a>
			</div>
			<p class="content">You've received this email because you requested to reset your password. To reset your password, simply click on the button above.</p>
			<p class="content">If you didn't initiate this password reset request, please ignore this email.</p>
			<div class="footer">
			  <p>IDS Inc.</p>
			  <p>Trendz Utility, 3rd Floor, Gafoor Nagar, Vittal Rao Nagar Road, Madhapur, Hyderabad, TS – 500081</p>
			</div>
		  </div>
		</body>
		</html>
		`,
	};

	await transporter.sendMail(mailOptions);
};

export const userResetPasswordSuccessMail = async (email, name) => {
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'BBN Portal - Password Reset Successful',
		html: `<!DOCTYPE html>
		<html>
		<head>
		  <title>BBN Portal - Password Reset Successful</title> 
		  <style>
			/* CSS Styling */
			@media only screen and (max-width: 600px) {
			  .container {
				width: 100% !important;
				padding: 20px !important;
			  }
			}
		
			body {
			  margin: 0;
			  padding: 0;
			  font-family: Arial, sans-serif;
			  background-color: #f2f2f2;
			}
		
			.container {
			  max-width: 600px;
			  margin: 0 auto;
			  padding: 60px 20px;
			  background-color: #ffffff;
			  border-radius: 8px;
			  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			}
		
			.header {
			  text-align: center;
			  margin-bottom: 40px;
			}
		
			.header h1 {
			  color: #333333;
			  font-size: 24px;
			  margin-top: 0;
			}
		
			.content {
			  color: #333333;
			  line-height: 1.5;
			}
		
			.success {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 20px;
			  color: #00cc00;
			}
		
			.footer {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 14px;
			  color: #777777;
			}
		
			.bold {
			  font-weight: bold;
			}
		
			.emoji {
			  font-size: 20px;
			  margin-right: 5px;
			}
		  </style>
		</head>
		<body>
		  <div class="container">
			<div class="header">
			  <h1>BBN Portal</h1>
			  <img src="https://bharatblockchain.io/wp-content/uploads/2022/04/cropped-bbn-logo.png" alt="Logo" width="200">
			</div>
			<p class="success">🔒 Your password has been reset 🔒</p>
			<p class="content">Congratulations ${name}! Your password has been successfully reset. You can now login to your account using your new password.</p>
			
			<div class="footer">
			  <p>IDS Inc.</p>
			  <p>Trendz Utility, 3rd Floor, Gafoor Nagar, Vittal Rao Nagar Road, Madhapur, Hyderabad, TS – 500081</p>
			</div>
		  </div>
		</body>
		</html>
		`,
	};

	await transporter.sendMail(mailOptions);
};

export const userAcceptChallengeEmail = async (email, token, name, hostURL) => {
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'BBN Portal - Invitation to Join Our Hackathon Team',
		html: `<!DOCTYPE html>
		<html>
		<head>
		  <title>BBN Portal - Invitation to Join Our Hackathon Team</title>
		  <style>
			/* CSS Styling */
			@media only screen and (max-width: 600px) {
			  .container {
				width: 100% !important;
				padding: 20px !important;
			  }
			}
		
			body {
			  margin: 0;
			  padding: 0;
			  font-family: Arial, sans-serif;
			  background-color: #f2f2f2;
			}
		
			.container {
			  max-width: 600px;
			  margin: 0 auto;
			  padding: 60px 20px;
			  background-color: #ffffff;
			  border-radius: 8px;
			  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			}
		
			.header {
			  text-align: center;
			  margin-bottom: 40px;
			}
		
			.header h1 {
			  color: #333333;
			  font-size: 24px;
			  margin-top: 0;
			}
		
			.content {
			  color: #333333;
			  line-height: 1.5;
			}
		
			.success {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 20px;
			  color: #00cc00;
			}
		
			.footer {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 14px;
			  color: #777777;
			}
		
			.bold {
			  font-weight: bold;
			}
		
			.button-container {
			  text-align: center;
			}
		
			.button {
			  display: inline-block;
			  padding: 8px 15px;
			  background-color: #0088cc;
			  color: #ffffff;
			  text-decoration: none;
			  border-radius: 6px;
			  transition: background-color 0.3s ease;
			  font-size: 16px;
			  margin-top: 20px;
			}
		
			.button:hover {
			  background-color: #006699;
			}
		
			.emoji {
			  font-size: 20px;
			  margin-right: 5px;
			}
		  </style>
		</head>
		<body>
		  <div class="container">
			<div class="header">
			  <h1>BBN Portal</h1>
			  <img src="https://bharatblockchain.io/wp-content/uploads/2022/04/cropped-bbn-logo.png" alt="Logo" width="200">
			</div>
			<p class="content">Hi ${name}</p>

			<p class="content">We are thrilled to invite you to join our hackathon team, Your skills and expertise make you a perfect fit, and we believe you will contribute significantly to our team's success.</p>

			<p class="success">Invitation Received!</p>
			<p class="content">To accept the invitation and become a part of our hackathon team, please click the link below.</p>
			<div class="button-container">
			  <a class="button" href="${hostURL}/memeber-verification/${token}">Accept Invitation</a>
			</div>
			<p class="content">By accepting, you'll be joining forces with like-minded individuals who are passionate about technology and innovation. Together, we will strive to develop a winning solution that makes a positive impact.</p>
			<div class="footer">
			  <p>IDS Inc.</p>
			  <p>Trendz Utility, 3rd Floor, Gafoor Nagar, Vittal Rao Nagar Road, Madhapur, Hyderabad, TS – 500081</p>
			</div>
		  </div>
		</body>
		</html>
		`,
	};

	await transporter.sendMail(mailOptions);
};

export const userResetPasswordWithAcceptChallengeEmail = async (email, token, name, hostURL) => {
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'BBN Portal - Reset Password',
		html: `<!DOCTYPE html>
		<html>
		<head>
		  <title>BBN Portal - Reset Password</title>
		  <style>
			/* CSS Styling */
			@media only screen and (max-width: 600px) {
			  .container {
				width: 100% !important;
				padding: 20px !important;
			  }
			}
		
			body {
			  margin: 0;
			  padding: 0;
			  font-family: Arial, sans-serif;
			  background-color: #f2f2f2;
			}
		
			.container {
			  max-width: 600px;
			  margin: 0 auto;
			  padding: 60px 20px;
			  background-color: #ffffff;
			  border-radius: 8px;
			  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			}
		
			.header {
			  text-align: center;
			  margin-bottom: 40px;
			}
		
			.header h1 {
			  color: #333333;
			  font-size: 24px;
			  margin-top: 0;
			}
		
			.content {
			  color: #333333;
			  line-height: 1.5;
			}
		
			.success {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 20px;
			  color: #00cc00;
			}
		
			.footer {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 14px;
			  color: #777777;
			}
		
			.bold {
			  font-weight: bold;
			}
		
			.button-container {
			  text-align: center;
			}
		
			.button {
			  display: inline-block;
			  padding: 8px 15px;
			  background-color: #0088cc;
			  color: #ffffff;
			  text-decoration: none;
			  border-radius: 6px;
			  transition: background-color 0.3s ease;
			  font-size: 16px;
			  margin-top: 20px;
			}
		
			.button:hover {
			  background-color: #006699;
			}
		
			.emoji {
			  font-size: 20px;
			  margin-right: 5px;
			}
		  </style>
		</head>
		<body>
		  <div class="container">
			<div class="header">
			  <h1>BBN Portal</h1>
			  <img src="https://bharatblockchain.io/wp-content/uploads/2022/04/cropped-bbn-logo.png" alt="Logo" width="200">
			</div>
			<p class="content">Hi ${name}</p>
			<p class="content">🔒 Forgot your password? No worries! 🔒</p>
			<p class="success">🔑 Reset Password 🔑</p>
			<div class="button-container">
			  <a class="button" href="${hostURL}/reset-password/${token}">🔓 Reset Password</a>
			</div>
			<p class="content">You've received this email because you requested to reset your password. To reset your password, simply click on the button above.</p>
			<p class="content">If you didn't initiate this password reset request, please ignore this email.</p>
			<div class="footer">
			  <p>IDS Inc.</p>
			  <p>Trendz Utility, 3rd Floor, Gafoor Nagar, Vittal Rao Nagar Road, Madhapur, Hyderabad, TS – 500081</p>
			</div>
		  </div>
		</body>
		</html>
		`,
	};

	await transporter.sendMail(mailOptions);
};

export const teamCaptainSuccessRegisterChallengeEmail = async (email, name, hostURL) => {
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'BBN Portal - Congratulations on Registering as a Team Captain!',
		html: `<!DOCTYPE html>
		<html>
		<head>
		  <title>BBN Portal - Congratulations on Registering as a Team Captain!</title>
		  <style>
			/* CSS Styling */
			@media only screen and (max-width: 600px) {
			  .container {
				width: 100% !important;
				padding: 20px !important;
			  }
			}
		
			body {
			  margin: 0;
			  padding: 0;
			  font-family: Arial, sans-serif;
			  background-color: #f2f2f2;
			}
		
			.container {
			  max-width: 600px;
			  margin: 0 auto;
			  padding: 60px 20px;
			  background-color: #ffffff;
			  border-radius: 8px;
			  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			}
		
			.header {
			  text-align: center;
			  margin-bottom: 40px;
			}
		
			.header h1 {
			  color: #333333;
			  font-size: 24px;
			  margin-top: 0;
			}
		
			.content {
			  color: #333333;
			  line-height: 1.5;
			}
		
			.success {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 20px;
			  color: #00cc00;
			}
		
			.footer {
			  text-align: center;
			  margin-top: 40px;
			  font-size: 14px;
			  color: #777777;
			}
		
			.bold {
			  font-weight: bold;
			}

			.emoji {
			  font-size: 20px;
			  margin-right: 5px;
			}
		  </style>
		</head>
		<body>
		  <div class="container">
			<div class="header">
			  <h1>BBN Portal</h1>
			  <img src="https://bharatblockchain.io/wp-content/uploads/2022/04/cropped-bbn-logo.png" alt="Logo" width="200">
			</div>
			<p class="content">Hi,</p>
			<p class="content">Congratulations! We are delighted to inform you that you have successfully registered as a Team Captain for our upcoming hackathon.</p>

			<p class="success">Registration Confirmed!</p>
			<p class="content">Your leadership and skills make you an ideal choice for guiding your team to victory. We believe your innovative spirit and dedication will inspire your teammates.</p>
			<p class="content">As a Team Captain, you will play a crucial role in shaping the direction of your team's project and fostering a collaborative environment.</p>
			<p class="content">Keep an eye on your inbox for updates and communications related to the hackathon. The event promises exciting challenges, networking opportunities, and a chance to showcase your talents on a grand stage.</p>
			<div class="footer">
			  <p>IDS Inc.</p>
			  <p>Trendz Utility, 3rd Floor, Gafoor Nagar, Vittal Rao Nagar Road, Madhapur, Hyderabad, TS – 500081</p>
			</div>
		  </div>
		</body>
		</html>
		`,
	};

	await transporter.sendMail(mailOptions);
};

export const partnerDocumentSendTokenEmail = async (email, name, token) => {
	var HOST_PORATALURL = emailVariablesConfig.HOST_PORTALURL;
	const mailOptions = {
		from: `Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Invitation For Signing the MOU-Document',
		html: `<div style="background-color: #f2f2f2; padding: 20px 20px; margin: 0 auto;">
            <p style="font-size: 38px; color: #061B61;margin-top:0;margin-bottom:15px">Bharat Blockchain Network Node Setup</p>
            <div style="background-color: #ffffff; padding: 20px 20px; margin: 0 ; box-shadow: 4px 6px 23px 0 rgba(202,210,224,.7), 1px 2px 4px 0 #c8d2e1;">
            <p>Hi ${name}</p>
            <p>Greetings from Bharat Blockchain Network (BBN), an initiative from IDS with the support of AICTE.</p>
            <div><a style="display: inline-block; font-weight: normal; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid #34bfa3; padding: 0.65rem 1.25rem; font-size: 1rem; line-height: 1.25; border-radius: 0.25rem; color: #fff; background-color: #061B61; cursor: pointer !important; text-decoration: none;" href = "${HOST_PORATALURL}/auth/register/${token}" target="_blank" rel="noopener">Confirm Email Address</a></div>
            <p>If you are unable to click on button. Please Click on given Link.</p>
            <a href= "${HOST_PORATALURL}/auth/register/${token}">${HOST_PORATALURL}/auth/register/${token}</a>
            <p><strong>If you haven&rsquo;t requested this email, there&rsquo;s nothing to worry about &ndash; you can safely ignore it.</strong><br /> Look forward to work with you,<br /> Team IDS.</p>
            </div>`,
	};

	await transporter.sendMail(mailOptions);
};

export const sendCredentialsAccessEmail = async (email, name, credUniqueNumber) => {
	var HOST_DEVURL = emailVariablesConfig.HOST_DEVURL;
	const mailOptions = {
		from: `B-ON | Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Congratulations! You have earned a Certificate.',
		html: `<p>Hi ${name},</p>
		<p>We are thrilled to inform you that you have successfully earned a new certificate from the BON Portal! 🎉 </p>
		<p>Here are some important details regarding your certificate:</p>

		<ul>
			<li><strong>Certificate Number:</strong> ${credUniqueNumber}</li>
		</ul>

		<p>To access and download your certificate, please follow these steps:</p>

		<ol>
			<li>Click on the link below to view your certificate/badge.</li>
			<li>You can claim your certificate/badge from the BON page by logging in and providing your MetaMask wallet address.</li>
			<li>After claiming, Certificate/Badge will be available in your "My Credential" Section.</li>
			</ol>
			
			<div><a style="display: inline-block; font-weight: normal; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid #34bfa3; padding: 0.65rem 1.25rem; font-size: 1rem; line-height: 1.25; border-radius: 0.25rem; color: #fff; background-color: #061B61; cursor: pointer !important; text-decoration: none;" href = "${HOST_DEVURL}/credential/${credUniqueNumber}" target="_blank" rel="noopener">Access Your Credential</a></div>
			<p>If you are unable to click on button. Please Click on given Link.</p>
			<a href= "${HOST_DEVURL}/credential/${credUniqueNumber}">${HOST_DEVURL}/credential/${credUniqueNumber}</a>

		<p>Please ensure that your personal information on the certificate is accurate. If you notice any discrepancies or have questions about your certificate, feel free to reach out to our support team at developer@idssoft.com</p>`,
	};

	await transporter.sendMail(mailOptions);
};


export const transferCredentialsEmail = async (email, name, credUniqueNumber) => {
	var HOST_DEVURL = emailVariablesConfig.HOST_DEVURL;
	const mailOptions = {
		from: `B-ON | Bharat Blockchain Network ${emailVariablesConfig.MAILER_EMAIL}`,
		to: email,
		subject: 'Congratulations! You have earned a Certificate.',
		html: `<p>Hi ${name},</p>
		<p>We are thrilled to inform you that we have successfully transferred Certificate to your BON Account! 🎉 </p>

		<ul>
			<li><strong>Certificate Number:</strong> ${credUniqueNumber}</li>
		</ul>

		<p>You can now share and download it from below button</p>
			
		<div><a style="display: inline-block; font-weight: normal; text-align: center; white-space: nowrap; vertical-align: middle; user-select: none; border: 1px solid #34bfa3; padding: 0.65rem 1.25rem; font-size: 1rem; line-height: 1.25; border-radius: 0.25rem; color: #fff; background-color: #061B61; cursor: pointer !important; text-decoration: none;" href = "${HOST_DEVURL}/credential/${credUniqueNumber}" target="_blank" rel="noopener">Download Credential</a></div>
		<p>If you are unable to click on button. Please Click on given Link.</p>
		<a href= "${HOST_DEVURL}/credential/${credUniqueNumber}">${HOST_DEVURL}/credential/${credUniqueNumber}</a>

		<p>feel free to reach out to our support team at developer@idssoft.com</p>

		<p>Team IDS</P>`,
	};

	await transporter.sendMail(mailOptions);
};