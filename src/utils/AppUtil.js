/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const buildCCP = (org) => {
	console.log("line 17",org);
	let ccpPath;
	switch (org) {
		case 'SBI':
			ccpPath = path.resolve(
				__dirname,
				'..',
				'utils',
				'connection-sbi.json'
			);
			break;
		case 'ICICI':
			ccpPath = path.resolve(
				__dirname,
				'..',
				'utils',
				'connection-icici.json'
			);
			break;
		case 'RBI':
			ccpPath = path.resolve(
				__dirname,
				'..',
				'utils',
				'connection-rbi.json'
			);
			break;
	}

	console.log("line 42",ccpPath);
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, 'utf8');

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};

export const buildWallet = async (Wallets, walletPath) => {
	// Create a new  wallet : Note that wallet is for managing identities.
	let wallet;
	if (walletPath) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log(`Built a file system wallet at ${walletPath}`);
	} else {
		wallet = await Wallets.newInMemoryWallet();
		console.log('Built an in memory wallet');
	}

	return wallet;
};

export const prettyJSONString = (inputString) => {
	if (inputString) {
		return JSON.stringify(JSON.parse(inputString), null, 2);
	} else {
		return inputString;
	}
};