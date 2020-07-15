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
        if(DBConnection.conn.isConnected){
            console.log({
                "message": "Database connection is active",
                "isConnected": true 
            });

            return true;
        }
        console.error({
            "error": "Database connection failure",
            "isConnected": false
        });

        return false;
    }
}

export default DBConnection.getInstance();

