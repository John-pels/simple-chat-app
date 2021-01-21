const app = require("express")();
const http = require("http").Server(app);
const socket = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

socket.on("connection", (socket) => {
  console.log("A user connected");
});

http.listen(3000, () => {
  console.log("Listening on *:3000");
});
