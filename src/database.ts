import dotenv from 'dotenv';
import {Pool} from 'pg';


dotenv.config();

const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_TEST_NAME,
    ENV
    } = process.env;
    const client = new Pool({
        host: DB_HOST,
        user: DB_USER,
        database : (ENV==='dev')? DB_NAME: DB_TEST_NAME,
        password: DB_PASS
    })

   
    export default client;