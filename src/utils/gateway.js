'use strict';

const {
	Gateway,
	Wallets
} = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const {
	buildCAClient,
	registerAndEnrollUser,
	enrollAdmin,
} = require('../utils/CAUtil.js');
const {
	buildCCP,
	buildWallet
} = require('./AppUtil.js');
const {
	response
} = require('express');
var ObjectID = require('bson-objectid');

const channelName = 'channelone';
const chaincodeName = 'chaincode';
const mspId = 'MULMUNDRAMSP';
const walletPath = path.join(__dirname, '../wallet');
const caHostName = 'ca.mulmundra.mpower.in';
const appUserId = 'appUser1';
const {
	logger
} = require('./../config/logger')

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

exports.evaluateTransaction = async (org, appUserId, channelName,
	chaincodeName, transactionName, ...args) => {
	try {
		
		await connectToFabric(org, appUserId, channelName,
			chaincodeName,)
		logger.info(
			`\n--> Evaluate Transaction: ${transactionName} for args ${args}`
		);
		console.log(
			`\n--> Evaluate Transaction: ${transactionName} for args ${args}`
		);
		let result = await contract.evaluateTransaction(transactionName, ...args);
		logger.info(`*** Result: ${result}`);
		return JSON.parse(result.toString());
	} finally {
		// Disconnect from the gateway when the application is closing
		// This will close all connections to the network
		//gateway.disconnect();
	}
};

exports.submitTransaction = async (org, appUserId, channelName,
	chaincodeName,transactionName, ...args) => {
	// Get the contract from the network.network.
	//const [contract, gateway] = await getContract();
	try {
		await connectToFabric(org, appUserId, channelName,
			chaincodeName,)
		logger.info(
			`\n--> Submit Transaction: ${transactionName} with args ${args}`
		);
		const result = await contract.submitTransaction(transactionName, ...args);
		console.log('*** Result: committed');
		logger.info(`Result: ${result}`);
		return JSON.parse(result.toString());
		//return `{"transactionId": ${result}}`
	} finally {
		//gateway.disconnect();
	}
};

exports.deleteTransaction = async (org, appUserId, channelName,
	chaincodeName, transactionName, ...args) => {
	// Get the contract from the network.network.
	//const [contract, gateway] = await getContract();
	try {
		await connectToFabric(org, appUserId, channelName,
			chaincodeName)
		logger.info(`\n--> Delete Transaction: ${transactionName} with args ${args}`)
		console.log(
			`\n--> Submit Transaction: ${transactionName} with args ${args}`
		);
		const result = await contract.submitTransaction(transactionName, ...args);
		console.log('*** Result: committed');
		logger.info(`Result: ${result}`);
		// return JSON.parse(result.toString());
		return `{"transactionId": ${result}}`;
	} finally {
		// Disconnect from the gateway when the application is closing
		// This will close all connections to the network
		//gateway.disconnect();
	}
};

exports.idGenerator = async () => {
	const uniqueId = new ObjectID();
	return uniqueId;
};

exports.getContract = async () => {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCP();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, caHostName);

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspId);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(
			caClient,
			wallet,
			mspId,
			appUserId,
			'mulmundra.department1'
		);

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		// setup the gateway instance
		// The user will now be able to create connections to the fabric network and be able to
		// submit transactions and query. All transactions submitted by this gateway will be
		// signed by this user using the credentials stored in the wallet.
		await gateway.connect(ccp, {
			wallet,
			identity: appUserId,
			discovery: {
				enabled: true,
				asLocalhost: false
			}, // using asLocalhost as this gateway is using a fabric network deployed locally
		});

		// Build a network instance based on the channel where the smart contract is deployed
		const network = await gateway.getNetwork(channelName);
		console.log(`network: ${gateway}`);

		// Get the contract from the network.
		const contract = network.getContract(chaincodeName);
		return [contract, gateway];
	} catch (error) {
		console.error(`******** FAILED to create contract instance: ${error}`);
	}
};

let gateway;
let contract;
async function connectToFabric(org, appUserId, channelName,
	chaincodeName) {
	try {
		const ccp = buildCCP(org);
		const wallet = await buildWallet(Wallets, walletPath);

		gateway = new Gateway();

		await gateway.connect(ccp, {
			wallet,
			identity: appUserId,
			discovery: {
				enabled: true,
				asLocalhost: true
			}

		});

		const network = await gateway.getNetwork(channelName);
		console.log(`network: ${gateway}`);

		// Get the contract from the network.
		contract = network.getContract(chaincodeName);
		logger.info('Connected to Fabric Network')
		return [contract, gateway];

	} catch (err) {
		logger.error('Database Error =>', err)
	}
}

//connectToFabric();