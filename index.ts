import express from "express"
import {createServer} from "node:http"
import {Server} from "socket.io"
const app = express()
const server = createServer(app)
const io = new Server(server)
app.get("/", (_, res)=>{
    res.send("<h1>Server is running</h1>")
})

server.listen(3000, ()=> {
    console.log("server is running  at port: http://localhost:3000");
    
})

io.on("connection", (socket)=>{
    socket.on("message",()=>{
        
    })
})