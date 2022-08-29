import  { JsonDB, Config } from 'node-json-db';


export const privateKey = "thisismykey";
export const businessEmail = "mabikorest@gmail.com";
export const password = "clcikygxpdopftok";
export  const jsonDB = new JsonDB(new Config('reservation-codes', true, true, '/'));