const socket = new WebSocket(`ws://${window.location.host}`);
//연결이됬을떄
socket.addEventListener("open", () => {
  console.log("Connected to Server in");
});
//메세지가 왔을때

socket.addEventListener("message", (message) => {
  console.log("New messae ", message.data);
});
// 연결이 끊겼을떄

socket.addEventListener("close", () => {
  console.log("Disconnected from Server out");
});

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);
