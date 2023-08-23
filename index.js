import express from "express"
const app = express()

//to connect the socket.io we have to require the http
import http from "http"
import cors from "cors"
import {Server} from "socket.io"

app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin: "https://splendorous-toffee-e3a460.netlify.app/",
        methods: ["GET","POST"],
    }
})

io.on("connection",(socket)=>{
    console.log(`user connected: ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`user with id: ${socket.id} joined the room: ${data}`);
    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("disconnect",()=>{
        console.log(("user disconnected"));
    })
})

server.listen(process.env.PORT || 3001,()=>{
    console.log("SERVER RUNNING");
})