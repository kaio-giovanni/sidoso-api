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

    private static isConnected(): any {
        let out = { msg: "", connected: false };
        switch(DBConnection.conn){
            case undefined:
                out = { msg: "Database ERROR: Connection object is undefined", connected: false };
                break;
            case null:
                out = { msg: "Database ERROR: Connection object is null", connected: false };
                break;
            default:
                out = { msg: "Database connection is active", connected: true };
                break;
        }
        console.log(out);
        return out;
    }
}

export default DBConnection.getInstance();

