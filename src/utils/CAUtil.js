/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

/**
 *
 * @param {*} FabricCAServices
 * @param {*} ccp
 */
export const buildCAClient = (FabricCAServices, ccp, caHostName) => {
  // Create a new CA client for interacting with the CA.
  const caInfo = ccp.certificateAuthorities[caHostName]; //lookup CA details from config
  const caTLSCACerts = caInfo.tlsCACerts.pem;
  const caClient = new FabricCAServices(
    caInfo.url, {
      trustedRoots: caTLSCACerts,
      verify: false
    },
    caInfo.caName
  );

  console.log(`Built a CA Client named ${caInfo.caName}`);
  return caClient;
};

export const enrollAdmin = async (caClient, wallet, orgMsp, org) => {
  try {
    let adminUserId;
    let adminUserPasswd;
    switch (org) {
      case "SBI":
        adminUserId = "adminsbi";
        adminUserPasswd = "adminpw";
        break;
      case "ICICI":
        adminUserId = "adminicici";
        adminUserPasswd = "adminpw";
        break;
      case "RBI":
        adminUserId = "adminrbi";
        adminUserPasswd = "adminpw";
        break;
      case "APRLKAWAI":
        adminUserId = "adminkawai";
        adminUserPasswd = "adminpw";
        break;
      case "APMLTIRODA":
        adminUserId = "admintiroda";
        adminUserPasswd = "adminpw";
        break;
      case "APMLMUNDRA":
        adminUserId = "adminapmlmun";
        adminUserPasswd = "adminpw";
        break;
      case "GETCO":
        adminUserId = "admingetco";
        adminUserPasswd = "adminpw";
        break;
      case "RRVPNL":
        adminUserId = "adminrrvpnl";
        adminUserPasswd = "adminpw";
        break;
      case "PGCIL":
        adminUserId = "adminpgcil";
        adminUserPasswd = "adminpw";
        break;
      case "MSETCL":
        adminUserId = "adminmsetcl";
        adminUserPasswd = "adminpw";
        break;
      case "GUJSLDC":
        adminUserId = "admingujsldc";
        adminUserPasswd = "adminpw";
        break;
      case "MAHASLDC":
        adminUserId = "adminmahasldc";
        adminUserPasswd = "adminpw";
        break;
      case "RAJSLDC":
        adminUserId = "adminrajsldc";
        adminUserPasswd = "adminpw";
        break;
      case "WESTRLDC":
        adminUserId = "adminwestrldc";
        adminUserPasswd = "adminpw";
        break;
      case "NORTHRLDC":
        adminUserId = "adminnorthrldc";
        adminUserPasswd = "adminpw";
        break;
    }
    // Check to see if we've already enrolled the admin user.
    const identity = await wallet.get(adminUserId);
    if (identity) {
      console.log(
        "An identity for the admin user already exists in the wallet"
      );
      return;
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await caClient.enroll({
      enrollmentID: adminUserId,
      enrollmentSecret: adminUserPasswd,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: orgMsp,
      type: "X.509",
    };
    await wallet.put(adminUserId, x509Identity);
    console.log(
      "Successfully enrolled admin user and imported it into the wallet"
    );
  } catch (error) {
    console.error(`Failed to enroll admin user : ${error}`);
  }
};

export const registerAndEnrollUser = async (
  caClient,
  wallet,
  orgMsp,
  userId,
  affiliation,
  org
) => {
  try {
    let adminUserId;
    let adminUserPasswd;
    const userIdentity = await wallet.get(userId);
    if (userIdentity) {
      console.log(
        `An identity for the user ${userId} already exists in the wallet`
      );
      return;
    }

    switch (org) {
		case "SBI":
			adminUserId = "adminsbi";
			adminUserPasswd = "adminpw";
			break;
		  case "ICICI":
			adminUserId = "adminicici";
			adminUserPasswd = "adminpw";
			break;
		  case "RBI":
			adminUserId = "adminrbi";
			adminUserPasswd = "adminpw";
			break;
      case "APRLKAWAI":
        adminUserId = "adminkawai";
        adminUserPasswd = "adminpw";
        break;
      case "APMLTIRODA":
        adminUserId = "admintiroda";
        adminUserPasswd = "adminpw";
        break;
      case "APMLMUNDRA":
        adminUserId = "adminapmlmun";
        adminUserPasswd = "adminpw";
        break;
      case "GETCO":
        adminUserId = "admingetco";
        adminUserPasswd = "adminpw";
        break;
      case "RRVPNL":
        adminUserId = "adminrrvpnl";
        adminUserPasswd = "adminpw";
        break;
      case "PGCIL":
        adminUserId = "adminpgcil";
        adminUserPasswd = "adminpw";
        break;
      case "MSETCL":
        adminUserId = "adminmsetcl";
        adminUserPasswd = "adminpw";
        break;
      case "GUJSLDC":
        adminUserId = "admingujsldc";
        adminUserPasswd = "adminpw";
        break;
      case "MAHASLDC":
        adminUserId = "adminmahasldc";
        adminUserPasswd = "adminpw";
        break;
      case "RAJSLDC":
        adminUserId = "adminrajsldc";
        adminUserPasswd = "adminpw";
        break;
      case "WESTRLDC":
        adminUserId = "adminwestrldc";
        adminUserPasswd = "adminpw";
        break;
      case "NORTHRLDC":
        adminUserId = "adminnorthrldc";
        adminUserPasswd = "adminpw";
        break;
    }
    // Must use an admin to register a new user
    const adminIdentity = await wallet.get(adminUserId);
    if (!adminIdentity) {
      console.log(
        "An identity for the admin user does not exist in the wallet"
      );
      console.log("Enroll the admin user before retrying");
      res.status(400).json({
        success: false,
        meg: "Enroll the admin user before retrying",
      });
    }

    // build a user object for authenticating with the CA
    const provider = wallet
      .getProviderRegistry()
      .getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, adminUserId);
    // Register the user, enroll the user, and import the new identity into the wallet.
    // if affiliation is specified by client, the affiliation value must be configured in CA
    const secret = await caClient.register({
        affiliation: affiliation,
        enrollmentID: userId,
        role: "client",
      },
      adminUser
    );
    const enrollment = await caClient.enroll({
      enrollmentID: userId,
      enrollmentSecret: secret,
    });
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: orgMsp,
      type: "X.509",
    };
    await wallet.put(userId, x509Identity);
    console.log(
      `Successfully registered and enrolled user ${userId} and imported it into the wallet`
    );
  } catch (error) {
    console.error(`Failed to register user : ${error}`);
  }
};