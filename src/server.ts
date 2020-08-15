import app from './app';
import dotenv from 'dotenv';
import socket from 'socket.io';
import Chat, { IUser, IMessage } from './chat/Main';

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

io.on("connection", (client) => {
  console.log(`User ${client.id} connected`);

  // when the user enters the application
  client.on("join", (data) => {

    let user: IUser = {
      socketid: client.id,
      sysId: data.sysId,
      email: data.email,
      name: data.name
    }
    Chat.addUser(user);
    
    client.emit("joined", "You have connected to the server");
    client.broadcast.emit("joined", user.name + "Has joined to the server");

    // Return all users online
    io.emit("usersOnline", Chat.getUsers());
  });

  // Add socketid in the room
  client.on("new room", (args) => {
    client.join(args.room_name);

    let index = Chat.findIndexBySocketId(client.id);

    if (index === null){
      // not found
    }else{
      io.in(args.room_name).emit("login room", Chat.findByIndex(index));
    }
  });
  
/*
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
*/

  client.on("send private message", (data: IMessage) => {
    let userReceptor: IUser = Chat.findByEmail(data.rec_email);

    if(userReceptor === null){
      // not found
    }else{
      client.broadcast.to(userReceptor.socketid).emit("receive private message", data) 
    }
  })

  client.on("disconnect", () => {
    let index = Chat.findIndexBySocketId(client.id);

    if (index === null){
      // not found
    }else{
      io.emit("disconnected", Chat.findByIndex(index));

      Chat.delUser(index);

      // Return all users online
      io.emit("usersOnline", Chat.getUsers());
    }
  });

});