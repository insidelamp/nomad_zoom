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

*/
/* 

*/
/* 

*/
/* 

*/
