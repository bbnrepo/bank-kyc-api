/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser } = require('../utils/CAUtil.js');
const { buildCCP, buildWallet } = require('../utils/AppUtil.js');

const mspOrg1 = 'MULMUNDRAMSP';
const walletPath = path.join(__dirname, '../wallet');

async function registerUser (userId) {
	let response;
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCP();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(
			FabricCAServices,
			ccp,
			'ca.mulmundra.mpower.in'
		);

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, userId);

		response = {
			success: true,
			message: `Successfully enrolled client user ${userId} and imported it into the wallet`,
		};
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
		response = {
			success: false,
			message: `${error}`,
		};
	}

	return response;
}

module.exports = registerUser;
//registerUser('appUser1');
// registerHDFCUser('operator1','hdfc.operator');
