import { Connection, createConnection } from 'typeorm';
import dbConfig from '../config/database';

class DBConnection {
    private static conn: Promise<Connection>;

    constructor(){}

    static getInstance(): Promise<Connection> {
        if(DBConnection.conn === null){
            DBConnection.conn = createConnection(dbConfig)
        }
        return DBConnection.conn;
    }
}

export default DBConnection;

