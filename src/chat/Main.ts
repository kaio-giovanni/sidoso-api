
export interface IUser {
    socketid: string,
    sysId: number,
    email: string,
    name: string
}

export interface IMessage {
    socketid: string, //sender socket id
    sender: number, // sys id user sender
    receptor: number, // sys id user receptor
    rec_email: string, // receptor email
    message: string,
    sender_at: string
}

export default class Chat {
    static usersOnline: any[] = [];

    static getUsers(){
        return this.usersOnline;
    }

    static addUser(user: IUser){
        console.log("New user joined: " + user.name + " | " + user.email + " | " + user.socketid);
        this.usersOnline.push(user);
    }

    static delUser(index: number){
        const removedUser = this.usersOnline.splice(index, 1);
        console.log("User Offline: "+removedUser.toString())
    }

    static findIndexBySocketId(socketid: string){
        const index = this.usersOnline.findIndex(obj => obj.socketid === socketid);
        if (index !== -1){
            return index;
        }
        return null;
    }

    static findByIndex(index: number){
        return this.usersOnline[index];
    }

    static findByEmail(email: string){
        let index = this.usersOnline.findIndex(obj => obj.email === email);
        if (index !== -1){
            return this.usersOnline[index];;
        }
        return null;
    }
}
