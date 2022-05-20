const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");

const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label == camera.label) {
        option.selected = true;
      }
      cameraSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstrains
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}
// 모든 미디어를 실행시키는 함수 ( 카메라, 마이크, 다른카메라, stream )
// getMedia();

// 마이크 On or Off 함수
function hanleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
//카메라 On or Off 함수
function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}
// 카메라 장치변경 함수
async function handleCameraChange() {
  await getMedia(cameraSelect.value);
}

muteBtn.addEventListener("click", hanleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
cameraSelect.addEventListener("input", handleCameraChange);

////////////////////////////////////////////////////////////////////////
// 위 작성한 부위는 media 관련

//Welcome Form ( join a room )

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

async function startMedia() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  socket.emit("join_room", input.value, startMedia);
  roomName = input.value;
  input.value = "";
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

//Socket Code

//Peer A 에서 보이는것
socket.on("welcome", async () => {
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log("sent the offer");
  socket.emit("offer", offer, roomName);
});
//Peer B 에서 보이는것
socket.on("offer", (offer) => {
  console.log(offer);
});

//RTC COde

function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(tract, myStream));
}

/*

영상과 오디오 데이터를 주고 받고 할때, 그 영상의 오디오와 데이터를 peer connection 에 넣어야함 
서로 다른 브라우저에서 카메라와 마이크의 데이터 stream 을 받아 연결안에 집어넣음 
아직 브라우저들을 연결하지않고 각 브라우저들을 따로 구성함 
이 화면에서는 peer A는 브라우저인데 강의에서는 Brave 라는 브라우저와 Firefox라는 브라우저 2개를 사용해서
Peer A = Brave , Peer B = Firefox 로 예를 들어서 사용함
현재 나는 Peer A = Crome , Peer B = Secret Crome 로 사용함
Peer A 에서 방(123) 을 만들고
Peer B 에서 방(123) 에 접속시 A에 나오는 함수가 socket("welcome") 이고
해당하는 정보들을 소켓 에밋 으로해서 서버로 보내주고 서버에서 오퍼를 받아 B에 위치정보등등 을 보여주고 a에는   console.log("sent the offer") 요거를 보여준다
offer 를 받아온순간 위치정보등등을 받아와서 대화가 가능함 



*/
