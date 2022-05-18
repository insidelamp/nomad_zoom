/*
1. 프론트엔드 자바스크립트 변경 시 서버가 재시작되지 않게 하는 방법

App.js에 내용이 수정시 nodemon이 새로직되고있는 문제가 있음
Views나 서버를 수정할떄만 nodemon이 재시작 되길원함 
nodemon 이 serverjs파일을 수정하거나 자바스크립트 파일들만 수정시 재시작되길원함

하지만프론트엔드 자바스크립트를 수정할떄는 nodemon이 새로고침 하지않길 원할시 
nodemon.json으로 가서 "ignore": ["src/public/*"] 을 추가해줘서 프론트엔드 자바스크립트가 수정되도 nodemon.json이 재시작이 안됨

하지만 server.js를 저장하면 nodemon이 재시작됨

1. Pug 로 view engine 을 설정하고 
2. Express에 template가 어디있는지 지정해줌
3. Public url 을 생성해서 유저에게 파일을 공유해주고
4. Home.pug를 render해주는 route handler를 만듬
5. Express 로 하는건 마지막이고 이다음부터 웹소켓으로 할예정

*/

/*

2. Map.css 입히는방법

Header 에 link(rel="stylesheet",href="https://unpkg.com/mvp.css”) 추가 해주면 기본 css가 잡힘 

*/

/*


시작 한것들 정리 0주차

1. 개발환경 구축
2. Nodemon 을 설저하기위해 nodemon.json 을 생성 ( 우리의 프로젝트를 살펴보고 변경사항이 있을 시 서버를 재시작해주는 프로그램 )
3. 서버를 재시작하는 대신에 babel-node 를 실행함  ( babel 은 우리가 작성한 코드를 일반 nodejs코드로 컴파일 해줌 src/server.js 로 )
4. server.js파일에서는 express를 import하고  express 어플리케이션을 구성함
5. 여기에 view engine 을 pug로 설정하고 views디렉토리가 설정됨
6. Public 파일들에 대해서도 똑같은 작업을 해줌
7. public파일들은 프론트엔드에서 구동되는 코드고 이건 중요한부분임 (여기저기 js코드들을 다루다보면 어디가 뭔지모를(프론트엔드 app.js, 벡엔드 server.js)경우있음 )
8.  server.js는 백엔드 , app.js 는 프론트엔드 에서 구동될예정
9. App.use(“/public” ) 부분이 폴더를 유저에게 공개해주는 부분임(사용자는 서버내의 폴더들을 자세하게 볼순없어야함 그래서 public부분만 사용자가 볼슀도록 폴더를 따로 지정해줌)
10. /public로 사용자가 이동할시 public폴더 내용을 볼수있음 
11. Home.pug 부분의 link(rel="stylesheet",href="https://unpkg.com/mvp.css") 부분은 css작업을 하기전 페이지에 임시적으로 css를 잡아주는 사이트를 연결해준것임
*/
