/**
 * Module handles database management
 *
 * Server API calls the methods in here to query and update the SQLite database
 */

// Utilities we need
import fs from 'fs';
import sqlite3 from 'sqlite3'
import { v4 as uuid } from 'uuid';
import randomstring from 'randomstring';
import { SHA1 } from 'crypto-js';

// Initialize the database
const dbFile = "./.data/accounts.db";
const exists = fs.existsSync(dbFile);
const db = new sqlite3.Database(dbFile);


db.serialize(async () => {
  // We use try and catch blocks throughout to handle any database errors
  try {
    // The async / await syntax lets us write the db operations in a way that won't block the app
    if (!exists) {
      await db.run(
          "CREATE TABLE Accounts (id TEXT PRIMARY KEY, username TEXT UNIQUE, password TEXT, salt TEXT)"
      );

      await db.run(
          "CREATE TABLE Codes (code TEXT PRIMARY KEY, accountId TEXT)"
      );

      await db.run(
          "CREATE TABLE Tokens (accessToken TEXT PRIMARY KEY, refreshToken TEXT, expires INTEGER, accountId TEXT)"
      );
    }
  } catch (dbError) {
    console.error(dbError);
  }
});

// Our server script will call these methods to connect to the db
export const createAccount = async (username, password) => {
  const salt = randomstring.generate(32)
  const account = {
    id: uuid(),
    username: username,
    salt: salt,
    password: SHA1(password + salt).toString()
  }

  await db.run("INSERT INTO Accounts (id, username, password, salt) VALUES (?, ?, ?, ?)", [
      account.id,
      account.username,
      account.password,
      account.salt
  ]);

  return account;
}

export const listAccounts = async () => {
  return await db.all("SELECT * from Accounts");
}

export const getAccount = async (id) => {
  return await db.get("SELECT * from Accounts WHERE id = ?", [id]);
}

export const getAccountByUsername = async (username) => {
  return await db.get("SELECT * from Accounts WHERE username = ?", [username]);
}

export const deleteAccount = async (id) => {
  await db.run("DELETE from Accounts WHERE id = ?", [id]);
  await db.run("DELETE from codes WHERE accountId = ?", [id]);
  await db.run("DELETE from Tokens WHERE accountId = ?", [id]);
}

export const generateCode = async (accountId) => {
  const code = randtoken.generate(32)
  await db.run("INSERT INTO Codes (code, accountId) VALUES (?, ?, ?, ?)", [
    code,
    accountId
  ]);
  return code;
}

export const redeemCode = async (code) => {
  const data = await db.get("SELECT * from Codes WHERE code = ?", [code]);
  if (data) {
    const authorization = {
      accessToken: uuid(),
      refreshToken: uuid(),
      expires: Math.round(Date.now() + (24 * 60 * 60 * 1000) / 1000),
    }

    await db.run("INSERT INTO Tokens (accessToken, refreshToken, expires, accountId) VALUES (?, ?, ?, ?)", [
      authorization.accessToken,
      authorization.refreshToken,
      authorization.expires,
      data.accountId
    ]);

    return authorization
  }
}

export const refreshTokens = async (refreshToken) => {
  const data = await db.get("SELECT * from Tokens WHERE refreshToken = ?", [refreshToken]);
  if (data) {
    const authorization = {
      accessToken: uuid(),
      refreshToken: uuid(),
      expires: Math.round(Date.now() + (24 * 60 * 60 * 1000) / 1000),
    }

    await db.run("UPDATE Tokens SET accessToken = ?, refreshToken = ?, expires = ? WHERE refreshToken = ?", [
      authorization.accessToken,
      authorization.refreshToken,
      authorization.expires,
      refreshToken
    ]);

    return authorization
  }
}

export const getAccountFromAccessToken = async (accessToken) => {
  const data = await db.get("SELECT * from Tokens WHERE accessToken = ?", [accessToken]);
  if (data) {
    return await db.get("SELECT * from Accounts WHERE id = ?", [data.accountId]);
  }
}
