import { Connection, createConnection } from 'typeorm';

class DBConnection {
    private static conn: Connection;

    constructor(){}

    static async getInstance(): Promise<Connection> {
        if(DBConnection.conn === undefined){
            try{
                DBConnection.conn = await createConnection("default");
            }catch(ex){
                console.error(ex);
            }
        }
        DBConnection.isConnected();

        return DBConnection.conn;
    }

    private static isConnected(): boolean {
        switch(DBConnection.conn){
            case undefined:
                console.error({
                    "error":"Database connection failure",
                    "message":"Database connection object is undefined"
                });
                return false;
            case null:
                console.error({
                    "error": "Database connection failure",
                    "message": "Database connection object is null"
                });
                return false;
            default:
                console.log({
                    "connection": "Database connection is active"
                });
                return true;
        }
    }
}

export default DBConnection.getInstance();

