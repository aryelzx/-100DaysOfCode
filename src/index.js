const http = require('http');
const { URL } = require('url');

const routes = require('./routes')

const port = 3000;
const local = 'http://localhost'


const server = http.createServer((req, res) => {
  const parsedUrl = new URL(`http://localhost:3000${req.url}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean)
  
  if(splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }


  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname  && routeObj.method === req.method
  ));

  if (route) {
    req.query = Object.fromEntries(parsedUrl.searchParams);
    req.params = { id };
    
    res.send = (statusCode, body) => {
      res.writeHead(statusCode, { 'Content-type': 'text/html' });
      res.end(JSON.stringify(body));
    }
    
    route.handler(req, res);
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end(`Cannot ${req.method} ${parsedUrl.pathname }`)
  }

})

server.listen(port, () => console.log(`server running on ${local}:${port}`))