import app from './app';
import dotenv from 'dotenv';
import socket from 'socket.io';

// Loads .env file into process.env
dotenv.config();
const app_port = process.env.PORT;
const app_host  = process.env.HOST;

const server = app.listen(app_port, () => {
    console.log(`Server is running in : ${ app_host }:${ app_port }`); 
});

/* 
 * -------------------- Web Socket setup -------------------- 
 * Chat with socket.io
 * 
 */ 

const io = socket(server);

let usersOnline: any[] = [];

io.on("connection", (client) => {
  console.log(`User ${client.id} connected`);

  client.on("join", (data) => {
    usersOnline.push({
      "socketid": client.id!,
      "sysId": data.id!,
      "email": data.email!,
      "name": data.name!
    });
    client.emit("joined", "You have connected to the server");
    client.broadcast.emit("joined", data.name + "Has joined to the server");
  });

  // Add socketid na sala
  client.on("new room", (args) => {
    client.join(args.room_name);

    let index = usersOnline.findIndex(obj => obj.socketid === client.id);
    console.log("user "+ usersOnline[index].name + " has joined in to"+ args.room_name);
  });

  client.on("send message to", (args) => {
    client.broadcast.to(args.room_name).emit("receive private message", {
      "id": client.id,
      "room_name": args.room_name,
      "sender": args.author,
      "receptor": args.receptor,
      "message": args.message,
      "sender_at": args.date
    });
  });

  client.on("disconnect", () => {
    let index = usersOnline.findIndex(obj => obj.socketid === client.id);
    
    io.emit("disconnected", usersOnline[index]);

    delete usersOnline[index];
  });

});