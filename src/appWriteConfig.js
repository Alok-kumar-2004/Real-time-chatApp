import { Account, Client, Databases } from 'appwrite';
// import config from './Config/config';
const client = new Client();
export const PROJECT_ID = '6811eb8e00282b146084'
export const DATABASE_ID= '68122e2b00329db21410'
export const COLLECTION_ID_MESSAGES= '68122e41001b6a55c629'
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6811eb8e00282b146084');

export const database = new Databases(client);
export const account = new Account(client)

export default client;