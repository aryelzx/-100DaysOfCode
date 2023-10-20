const http = require('http');
const { URL } = require('url');

const routes = require('./routes')

const port = 3000;
const local = 'http://localhost'


const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`http://localhost:3000${req.url}`);

  console.log(`Request method: ${req.method} | endpoint ${parsedUrl.pathname }`)

  const route = routes.find((routeObj) => (
    routeObj.endpoint === parsedUrl.pathname  && routeObj.method === req.method
  ));

  if (route) {
    req.query = Object.fromEntries(parsedUrl.searchParams);
    route.handler(req, res);
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end(`Cannot ${req.method} ${parsedUrl.pathname }`)
  }

})

server.listen(port, () => console.log(`server running on ${local}:${port}`))