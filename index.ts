import express from "express"
import {createServer} from "node:http"
import { join } from "node:path"
import {Server} from "socket.io"
import cors from "cors"
import { v4 } from "uuid"
import { log } from "node:console"
const app = express()
const server = createServer(app)
const io = new Server(server, {cors:{
    origin:"*"
}})
app.use(cors({
    origin: "*",
    allowedHeaders:"*"
}))
app.get("/", (_, res)=>{
    res.sendFile(join(__dirname, 'index.html'));
})

app.get("/notification.mp3", (_, res)=>{
    res.sendFile(join(__dirname, 'notification.mp3'));
})

server.listen(3000, ()=> {
    console.log("server is running  at port: http://localhost:3000");
    
})

io.on("connection", (socket)=>{
    console.log(socket.id)
    socket.on("message",(message, dest, from)=>{
        log({message, dest, from})
        io.emit(dest, message, from)
    })
    const setup =  {
        id:socket.id,
        pass:"Hello"
    }
    socket.emit("setup",JSON.stringify(setup))
})