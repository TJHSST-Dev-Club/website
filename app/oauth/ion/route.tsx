import simpleoauth2 from "simple-oauth2";
import "dotenv/config";

import sqlite3 from "sqlite3";
import { open } from "sqlite";

var ionClientId = process.env.ION_CLIENT_ID;
var ionClientSecret = process.env.ION_CLIENT_SECRET;
var ionRedirectUri = process.env.ION_REDIRECT_URI;

export async function GET(request: Request) {
  const oauth = simpleoauth2.create({
    client: {
      id: ionClientId,
      secret: ionClientSecret,
    },

    auth: {
      tokenHost: "https://ion.tjhsst.edu/oauth/",
      authorizePath: "https://ion.tjhsst.edu/oauth/authorize",
      tokenPath: "https://ion.tjhsst.edu/oauth/token/",
    },
  });

  let params = new URL(request.url).searchParams;
  const authorizationCode = params.get("code");

  if (!authorizationCode) {
    return new Response("Failed to get authorization code.", {
      status: 400,
    });
  }

  const result = await oauth.authorizationCode.getToken({
    code: authorizationCode,
    redirect_uri: ionRedirectUri,
  });

  const token = oauth.accessToken.create(result);
  const accessToken = token.token.access_token;

  // Use access token, not token, to get API
  // Read user's Ion username, full name, display name, and graduation year

  const response = await fetch("https://ion.tjhsst.edu/api/profile", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  const responseJson = await response.json();

  let ionId = responseJson["id"];
  let ionUsername = responseJson["ion_username"];
  let fullName = responseJson["full_name"];
  let displayName = responseJson["display_name"];
  let graduationYear = responseJson["graduation_year"];

  // Generate a one time code that is used to verify with the Discord bot
  // Id isn't super critical so we don't need cryptographically secure random number generation

  const discordVerificationCode = makeId(64);

  const db = await open({
    filename: "@/users.db",
    driver: sqlite3.Database,
  });

  // Check if user is already present in database

  const ionIdResult = await db.get(
    "SELECT ionId FROM users WHERE ionId = ?",
    ionId
  );

  if (!ionIdResult) {
    // User does not exist in database
    await db.run(
      "INSERT INTO users (ionId, ionUsername, fullName, displayName, graduationYear, verificationCode) values (?, ?, ?, ?, ?, ?)",
      [ionId, ionUsername, fullName, displayName, graduationYear]
    );
  } else {
    // User does exist, update values
    await db.run(
      "UPDATE users SET ionId=?, ionUsername=?, fullName=?, displayName=?, graduationYear=?, verificationCode=? WHERE ionId=?",
      [ionId, ionUsername, fullName, displayName, graduationYear, ionId]
    );
  }
}

function makeId(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
