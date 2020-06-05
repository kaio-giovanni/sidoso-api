import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const app_port = process.env.PORT;

app.listen(app_port, () => {
    console.log(`Server is running in port: ${ app_port }`);
});