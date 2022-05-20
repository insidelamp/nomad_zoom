/*

3-1

화면 나오게하기 함수
html에 연결


*/

/*

3-2

카메라 온온프 기능 함수들
마이크 온오프 기능 함수들
장치변경하는 함수들 

*/

/*

3-3

소켓연결이나 다른연결의 경우 pear-to-pear 커뮤니케이션이 불가능함

webRTC가 있으면  pear-to-pear 커뮤니케이션의 기능을 사용이 가능하다

pear-to-pear{

    1. 내 영상과 오디오와 내 텍스트가 서버로 가지않고 상대방에게 바로감
    2. 즉 서버가 필요없음 , 컴퓨터에서 브라우저에게 바로 보내주면 됨 상대 브라우저와 내 브라우저가 연결
    3. 실시간이 속도가 엄청 빠른이유 ( 서버를 거치지않고 바로 사용자에게 가짐)
}

webSocket 과 webRTC가 다른점

webSocket 

내가 다른 websocket에게 전달하지않음
내가 서버에게 전달하고 그 서버가 메세지를 보내줌 

webRTC

내가 서버에 전달하지않고 바로 상대방에게 직접적으로 전달함
영상이나 오디오가 서버를 통해서 전달되지않음 
그러나 Signaling 이 필요함 
Signaling 이 연결되어 있다면  pear-to-pear 이 가능하다는 예기임

Signaling 떄문에 서버가 필요함

서버가 필요한이유는 상대의 브라우저나 ip주소가 어떤지 알수없어서 서버를 사용해야함
사용하는 유저가 브라우저에서 서버한테 configuration 을 전달함과 동시에 브라우저의 위치도 전달함
브라우저는 접속하는 인터넷의 위치와 setting과  configuration , 방화벽, 라우터 등등의 정보를 서버에게 전달함

*/

/*
3 - 5

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
  myPeerConnection.setRemoteDecription(offer);
});


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


즉 
Firefox가 방에 참가하면 
socket.emit("join_room", input.value, startMedia);  =  이 문단을 서버로 보냄
그러면 Brave 브라우저(Peer A ) 에게 알림을 줌
Brave 브라우저는 ( Peer A )는 offer을 전송함 
전송된 offer 이 서버를 거쳐 Firefox( Peer B )에게 돌아옴 
Brave   브라우저의 콘솔에는 sent the offer 이 찍히게되고
Firefox 에는 사용자의 offer 이 찍히게됨

위 순간이 socket.io 나 webSocket 보다 느리게 결과가 나와서 3-6 에서 

socket.on("offer", (offer) => {
  myPeerConnection.setRemoteDecription(offer);
});

위의 결과를 넣을 시 에러가 발생함 

offer 가 도착한 순간  myPeerConnection 이 없어서 myPeerConnection.undefined 가 뜸 

위 코드는 Firefox 에서 발현되지않음 그래서 그거에 대한 수정을 3-6 에서 함


*/

/* 

handleWelcomeSubmit 에서 startMedia 는 우리 media를 가져가서 연결을 만들어주는 함수인데 
우리가 방에 참가하고 나서 호출하고있는데 그 대신 위 에러가 나기때문에 방에 참가하기전에 이 함수를 호출하게 만들어줌 

async function startMedia 에서 async function  initCall  로 바꿔 진행 

위 서버에서 변경했기때문에 서버에서의 done 이 필요없어 지워줌

3-6 에서 진행한것은 순서를 바꿔주는 일을함 
왜냐면 web Socket들의 속도가 media를 가져오는 속도나 연결을 만드는 속도보다 빠르기때문임 
위 순서 변경으로 getMedia 하고 makeConnection 을 한다음에 이벤트 emit ( 전송 ) 을 하도록 바꿔줌 
그럼 그게 Brave 브라우저 ( Peer A )에 우리가 도착했다는걸 알려줌 
이렇게 바꿔주면 위 offer 을 받았을때  myPeerConnection.undefined 가 발생하지않음 



//Peer A 에서 보이는것
socket.on("welcome", async () => {
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log("sent the offer");
  socket.emit("offer", offer, roomName);
});
//Peer B 에서 보이는것
socket.on("offer", async (offer) => {
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  console.log(answer);
});


위 Peer A 에서는 Brave 브라우저에서 돌아가고 ( 현재 Crome )
위 Peer B 에서는 Firefox 브라우저에서 돌아감 ( 현재 Scret Crome )

Brave 브라우저에서 setLocalDescription 을 했고 offer 을 만듬

그걸 Firefox 로 보냄 

Firefox 가 Brave 브라우저의 description 을 받을거고  
Firefox 가 setRemoteDescription 을 함 

그다음 Firefox가 answer 을 만듬

Firefox는 Brave 브라우저에게 그들의 answer을 보냄 

그래서 그 answer로 이제 Brave 브라우저는 remoteDescription 을 가지게됨 

그리하여 두 브라우저는 모두 LocalDescription 과 RemoteDescription을 가지게됨

1. Brave 브라우저에서 offer 을 만들었을때 LocalDescription 을 set함 
2. Firefox에서 offer을 받으면 setRemoteDescription 을 하고 
3. 같은 함수에서 answer을 만들어 LocalDescription을 set 함 
4. 그리고 answer을 다시 Brave 브라우저로 돌려보냄 
5. 그래서 Brave 브라우저가 setRemoteDescription 을 할수있게됨 

*/

/*

Peer to Peer 에서 

getUserMedia 를 해서 끝을내고 
addStream 은 안씀  대신 makeConnection 함수를 사용해 track들을 개별적으로 추가해줌 
그다음 Brave 브라우저에서 offer 을 만들어 줌 
Firefox 가 방에 참가했을때 offer 을 만들어줌 
Firefox가 들어오면 Brave 브라우저가 코드를 실행함 
그래서 Brave 브라우저에서 offer 을 만들었고 우리는 그 offer로 setLocalDescription을 함 
그리고 우리는 그걸 서버로 보냄
Firefox가 offer을 바로 여기서 받음 그게 socket.om("offer ") 부분임 
Firefox가 offer 을 받으면 그 offer로 setRemoteDescription 을 함 
그러면 Firefox 는 answer 을 생성하고 Firefox 는 그 answer로 setLocalDescription을 함
Peer to Peer 에서 getUserMedia() 와 addStream() 은 패스함 
왜냐면 이미 Firefox( 새로운 브라우저(사용자)  ) 가 방에 들어왔을떄 그것들을 실행해주기때문임  
answer 을 보낸후
그 answer은 다시 signaling server  즉 Socket.IO 로 돌아감 
Brave 브라우저에서 그 함수를 받았을때 setRemoteDescription을 하게됨 

*/
