const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let onlineUsers = 0;
io.on("connection", (socket) => {
  onlineUsers++;
  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("onlineUsers", onlineUsers);
  });
});

mongoose.connect("mongodb://127.0.0.1:27017/music");

const Song = require("./models/Song");

app.post("/upload", async (req, res) => {
  const song = new Song({
    title: req.body.title,
    status: "pending_user_approval"
  });
  await song.save();
  res.send("Waiting for user approval");
});

app.post("/approve/:id", async (req, res) => {
  await Song.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.send("Song approved and playable");
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

server.listen(5000, () => console.log("Server running"));