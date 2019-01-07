const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

const { google } = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly'
];
const CREDENTIALS_PATH = path.join(__dirname, 'react-app.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = message => {
  return new Promise(resolve => {
    rl.question(message + ' ', value => {
      rl.close();
      resolve(value);
    });
  });
};

const main = async () => {
  let credentials;

  try {
    const credentialsFile = await fs.readFile(CREDENTIALS_PATH);
    credentials = JSON.parse(credentialsFile.toString());
  } catch (e) {
    console.error(`Loading credentials @${CREDENTIALS_PATH} failed`);
    throw e;
  }

  // eslint-disable-next-line camelcase
  let { client_secret, client_id, redirect_uris } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  let token;
  try {
    const tokenFile = await fs.readFile(TOKEN_PATH);
    token = JSON.parse(tokenFile.toString());
  } catch (e) {
    console.warn(`Loading token @${TOKEN_PATH} failed`);
  }

  if (!token) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });

    console.log('Authorize this app by visiting this url:', authUrl);

    const code = await prompt('Enter the code from that page here:');

    try {
      const response = await oAuth2Client.getToken(code);
      token = response.tokens;
    } catch (e) {
      console.error(`Creating token for '${code}' failed`);
      throw e;
    }

    try {
      await fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    } catch (e) {
      console.error(`Creating token @${TOKEN_PATH} failed`);
      throw e;
    }
  }

  oAuth2Client.setCredentials(token);
};

main().catch(err => {
  console.error(err);
});
