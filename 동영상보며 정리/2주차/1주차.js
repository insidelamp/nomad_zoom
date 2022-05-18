/*

socket.io 프레임워크 사용 

socket.io는 websocket의 부가기능이 아님 

Socket.io는 프론트와 벡엔드 간 실시간 통신을 가능하게 해주는 프레임워크 또는 라이브러리임
front-end와 back-end 간 실시간 통신을 websocket을 이용해서 할수있음 
front-end와 back-end 간 실시간 통신을 하기위해서 꼭 socket.io를 사용할 필요는없지만
socket.io는 실시간 기능같은 것들을 더 쉽게 만드는 편리한 코드를 제공함 
socket.io 는 websocket을 실행하는것이 아님 

socket.io는 프레임워크인데 실시간, 양방향,event기반 통신을 제공함 

다른 여러 선택지 중에서 websocket을 이용해서 가능하게함

socket.io는 websocket보다 탄력성이 뛰어남 

만약 사용자의 브라우저가 websocket을 지원하지않거나 휴대폰에서 지원하지않을경우 websocket에 문제가 생겨도 socket.io는 계속 작동을함

만약 websocket 이용이 불가능하면 socket.io는 다른 방법을 이용해서 계속 작동함

먄약 socket.io가 브라우저가 websocket을 지원 한다는것을 확인하면 
socket.io는 websocket를 이용함
만약 firewall,proxy가 있어도 socket.io는 계속 작동함

만약 websocket을 지원하지않는 경우 HTTP long polling 같은것을 사용함

socket.io의 경우에는 만약 wiri연결이 잠시동안 끊겨도 socket.io는 재연결을 시도함 
    이전 강의에서 작성한 코드에 재연결 기능을 넣고싶으면 우리는 직접 만들어줘야함 

Socket.IO는 우리에게 신뢰성을줌
1. 브라우저가 websocket 지원을 안한거나
2. websocket 연결에 문제가있거나
3. 회사에서 websocket 사용이 안되는경우가있거나
4. Firewall 혹은 proxy 가 있거나 등등 어떤경우에든 
Socket.IO 는 실시간 기능을 제공해주는 기능임 
*/

/* 

http://localhost:3000/socket.io/socket.io.js <- 로컬호스트가아닌 이 화면으로 보여주는 이유
socketIO가 websocket의 부가기능이 아니기떄문임
1. SocketIO 는 재연결 기능이 있고 
2. websocket를 사용할수없을경우 socketIO는 다른것을 사용해서 가동됨

*/

/* 


socketIO를 설치해주면 화면에서 io라는 함수를 확인할수있음

io는 자동적으로 백엔드 socket.io 와 연결해주는 함수임

그래서 
화면에 const socket =io() ; 만 설정해주면 
io 함수는 알아서 socket.io 를 실행하고있는 서버를 찾음 

*/

/* 

1. 직접만든 event가있다 ( 프레임워크를 사용하기전에는 message로 고정되어 message로 사용해야함)
2. 프론트엔드에서 오브젝트를 전송할수있음 
( 오브젝트로 전달 불가능 프레임워크를 사용하기전에는 제이슨파싱해서 보내줘야함, Socket IO는 오브젝트를 문자로 바꿔주고 다시 알아서 자바스크립트 오브젝트로 만들어줌  )

*/
/* 

emit(방출하다) 메서드의 argument

서버로부터 함수를 호출할수있는데  그 함수는 프론트엔드에 함수가있음 그게 socket.emit 임 
클라이언트의  socket.emit 이름과 서버의 socket.on의 이름은 같아야함  ( ex: enter_room) 
socket.emit 에는 첫번째 argument에는 event 이름이 들어감, 두번쨰는 보내고싶은 payload가 들어감 , 새번째는 서버에서 호출하는 함수가 들어감

*/
/* 

2.3 정리

프레임워크를 사용하기 전에는 message만 보낼수있었음  ( 오직 string 로 되어있는 메세지만 보낼수있었음 )
string을 parse 하고 message.type을 얻을수 있었음

하지만 SocketIO를 사용하면 위와 같은방법으로만 사용하지않아도됨
1. SocketIO를 이용하면 모든것이 message일 필요가없음  ( 여러타입의 메세지가 새익면 메세지 함수가 엄청 커지기때문에 힘듬)
2. 대신 client에서 원하는 어떠한 event든 모두 emit해줄수있음 
3. 전송할때 정말 우리가 우너하는 아무거나 전송해줄수있음  ( 클라이언트에서 서버로 보내기 )
    그전에는 텍스트만 전송할수있었음 
    SocketIO를사용하면 숫자를 보낼수도있고 object를 보내줄수도있고, 한가지만 보내야한다는 제약도 없음 원하는만큼 전송 가능
    
socket.emit("enter_room" = 이름, { payload: input.value }= 오브젝트, () => {
    console.log("server is done!");
  } =  함수 );

SocketIO 프레임워크를  사용하기전에는 여러가지를 보낼수없고 string 한가지만 보내줄수있었음 
*/

/* 
handleMessageSubmit 설명

form 도 받고 handleMessageSubmit 도 하고 중복된 이벤트도 막아주고있음  
new_message event를 보내고있음  이건 백엔드로 가게됨
첫번쨰 argument로 input.value 를 보내고 ( msg )
두번째 argument는 (roomName ) 방제목이다 ( 메세지를 어디로 보내야하는지 알아야해서 )(소켓 방이 여러개있을수도있어서)
세번쨰는 함수를 보내는데 handleMessageSubmit함수가 모든게 끝나면 호출됨 server.js에서는 done() 임
done() 코드는 백엔드에서 실행하지않음 
백엔드에서 done을 호출했을경우 프론트에서 코드를실행함 

*/
