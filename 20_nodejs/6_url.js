// 기본모듈
// url : URL 처리하는 모듈
const http = require('http');
const url = require("url");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // string -> object
  // 127.0.0.1:3000/abc
  // Query String : '?year=3&class=4&name=최은규
  const obj = url.parse(req.url, true); // /abc 2번째 true는 query를 객체로 parse하는가
  console.log(obj);
  const year = obj.query.year;
  const cls = obj.query.class;
  const name = obj.query.name;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  // 3학년 4반 최은규입니다.
  res.end(`${year}학년 ${cls}반 ${name}입니다. 안녀핫세요!!`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});