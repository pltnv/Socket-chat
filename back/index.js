const express = require("express");

const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { addUser, findUser } = require("./users");

const route = require("./route");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connect is ok");
  socket.on("join", ({ name, room, time }) => {
    socket.join(room);

    const user = addUser({ name, room, time });

    // console.log(user, "iz dobalenua");
    socket.emit("message", {
      data: { user: { name: "Admin" }, message: `hey ${user.user.name}`, time },
    });

    socket.broadcast.to(user.user.room).emit("message", {
      data: {
        user: { name: "Admin" },
        message: `${user.user.name} has joined`,
        time,
      },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    console.log(params, "FROOOOM");
    const user = findUser(params);

    // console.log({ data: { user, message, ptime } });
    if (user) {
      io.to(user.room).emit("message", {
        data: { user, message, time: params.time },
      });
    }
  });

  io.on("disconnect", () => {
    console.warn("disconnected");
  });
});

server.listen(5001, () => {
  console.log("runned");
});
