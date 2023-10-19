const http = require('http');

const routes = require('./routes')

const port = 3000;
const path = 'http://localhost'


const server = http.createServer((req, res) => {
  console.log(`Request method: ${req.method} | endpoint ${req.url}`)

  const route = routes.find((routeObj) => (
    routeObj.endpoint === req.url && routeObj.method === req.method
  ));

  if (route) {
    route.handler(req, res);
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end(`Cannot ${req.method} ${req.url}`)
  }

})

server.listen(port, () => console.log(`server running on ${path}:${port}`))