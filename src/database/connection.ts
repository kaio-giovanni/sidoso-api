import { Connection, createConnection } from 'typeorm';
import dbConfig from '../config/database';

class DBConnection {
    private static conn: Connection;

    constructor(){}

    static async getInstance(): Promise<Connection> {
        if(DBConnection.conn === null){
            DBConnection.conn = await createConnection(dbConfig);
        }
        return DBConnection.conn;
    }
}

export default DBConnection.getInstance();

