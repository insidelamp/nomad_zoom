import http from "http";
// import WebSocket from "ws";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/public/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (reg, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
});
/*
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("Disconnected from the Browser out");
}

자바스크립트 웹소켓

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "";
  console.log("Connected to Browser in");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case "nickname":
        socket["nickname"] = message.payload;
    }
  });
});
 */
const handleListen = () => console.log(`Listening on http:/localhost:3000`);

httpServer.listen(3000, handleListen);

{
  type: "message";
  payload: "hello everyone!";
}

{
  type: "nickname";
  payload: "hi!";
}
