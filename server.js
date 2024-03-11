require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
  console.log(`Server Started on Port : ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// socket
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  //   console.log("Connected...");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
