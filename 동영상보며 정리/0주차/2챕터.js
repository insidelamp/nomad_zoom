/*

1. HTTP vs WebSockets

1. Http는 http protocol임 ( stateless ) - 백엔드는 사용자를 기억하지못하고 사용자에게 답만 해줄수있음 , 클라이언트는 request 만 할수있음 
    1. http protocol 은  사용자가 request를 보내면 서버에서 reponse를 보내주는 방식이다
        1. 서버는 사용자를 기억하지않고 request를 받으면 reponse를 보내주는 역활만함
        2. reponse를 받은 클라이언트가 사용자의 정보가있다면 쿠키에 저장하여 사용하게됨
    2. 서버는 리얼타임으로 일어나지않음
        1.   사용자가 request를 보내야하고 
        2.  서버가 사용자에게 아무것도 못해줌 ( 서버는 request를 기다려야하고 서버는 클라이언트에게 답장을 함, 서버가 바로 답장을 해줄순 없음  ) 

1. 웹소켓또한 websocket protocol 임  - 한번 연결이 성립되면 양방향 연결이 생김  ( request 나 response 가 필요없음 )
    1. 웹소켓 연결 ( connection) 이 일어날때 마치 악수처럼 작동함 
    2. 클라이언트가 서버로 webSocket request를 보내면 서버가 받거나 거절을 함
    3.  이러한 악수가 한번 성립되면 연결은 성립이됨
    4. 연결은 연결임 클라이언트와 서버가 손을 맞잡고있는것처럼 ( 터널이라고보면됨 , 브라우저랑 서버가 서로 커뮤니케이션하는거라고 보면됨 )
    5. 서버와 연결되어있기때문에 서버가 사용자가 누구인지 기억할수있음 
    6. 연결되어있기 때문에 원한다면 서버가 유저에게 메세지를 보낼수있음
    7. 서버는 request를 기다리지않고 답장을 할수있음  ( request, réponse 과정이 필요하지않고 발생 )
    8. 서버는 유저에게 메세지를 보낼수있고 유저도 서버에게 메세지를 보낼수있음 ( 양방향 연결 )
    9. 이 모든것들은 connection( 연결 ) 중일때만 가능함 
    10. 서버는 어떤 떄나 유저에게 메세지를 마음대로 보낼수있고 유저도 마찬가지로 언제든 보낼수있음
    11. 브라우저와 서버사이에 bi-directional 한 연결이 있어서 서로 바로 갈수있는 길이있음


*/
/*

*/
