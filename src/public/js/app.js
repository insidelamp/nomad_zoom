/*
자바스크립트 wssocket

const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
//연결이됬을떄 알려주는 라인

const socket = new WebSocket(`ws://${window.location.host}`);
//메세지를 json 타입으로 변경해주는 함수
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}
// 소켓연결됬을때 알려주는 함수
function handleOpen() {
  console.log("Connected to server in");
}

socket.addEventListener("open", handleOpen);
//메세지가 오면 li에 추가해주는 함수

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});
// 연결이 끊겼을떄 나오는 함수

socket.addEventListener("close", () => {
  console.log("Disconnected from Server out");
});
// 메세지 받을떄 나오는 함수
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  const li = document.createElement("li");
  li.innerText = `You ${input.value}`;
  messageList.append(li);
  input.value = "";
}
// 닉네임으로 메세지를 받을때 나오는 함수
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
*/

const socket = io();
