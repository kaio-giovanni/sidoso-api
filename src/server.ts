import app from './app';
import dotenv from 'dotenv';

// Loads .env file into process.env
dotenv.config();
const app_port = process.env.PORT;
const app_host  = process.env.HOST;

app.listen(app_port, () => {
    console.log(`Server is running in : ${ app_host }:${ app_port }`); 
}); 