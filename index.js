const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

users = [];
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("setUsername", (data) => {
    console.log(data);
    if (users.indexOf(data) > -1) {
      socket.emit(
        "userExists",
        data + " username is taken! Try some other username."
      );
    } else {
      users.push(data);
      socket.emit("userSet", { username: data });
    }
  });

  socket.on("chat message", (data) => {
    console.log("User message and username: " + data);
    io.emit("chat message", data);
  });
});

http.listen(3000, () => {
  console.log("Listening on *:3000");
});
