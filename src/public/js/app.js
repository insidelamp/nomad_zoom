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

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
//방이 없을시 방만드는 버튼 or 방 입장되었을경우 채팅 나누는 버튼
room.hidden = true;

let roomName;

//입장시 출력되는 함수
function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}
// 대화창에 메세지가 보이는 함수
function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You : ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  const value = input.value;
  socket.emit("nickname", input.value);
  input.value = "";
}
// 벡엔드로 new_message이벤트를 보내고 input.value와 방이름을 알기위해 roomName과 백엔드에서 시작시킬수있는 함수를 보냄

// 방 만드는 함수
function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  const nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);
}
// 방생성하는 함수
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

//입장시 출력
socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived!`);
});
//퇴장시 출력
socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerText = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

// 위의 방식이나 밑의방식이나 똑같이 작동함
