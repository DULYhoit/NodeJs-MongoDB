# NodeJS 란
1. 크롬 V8엔진을 가져와서 만든 자바스크립트 런타임
2. 자바스크립트는 각 브라우저 엔진으로 해석함
3. 서버를 만들수있음
- event-driven, non-blocking I/O
4. 코드가 매우 짧고 쉬움

# non-blocking
1. 일반
- (동기) 데이터 요청 : 순서대로, 오래걸리면 대기
2. Node.js
- (비동기) 데이터 요청 : 순서 상관없이 처리속도가 빠른것부터 실행

# 도움되는 도구
1. npm install -g nodemon :서버재실행
2. npm install body-parser : 요청 데이터(body) 해석을 도와줌
3. npm install ejs : html 을 좀더 쉽게 조작할수 있는 엔진