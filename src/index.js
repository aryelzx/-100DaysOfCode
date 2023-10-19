const http = require('http');

const port = 3000;
const path = 'http://localhost'
const server = http.createServer((req, res) => {
  console.log(`Request method: ${req.method} | endpoint ${req.url}`)

  res.writeHead(200, { "Content-type": "application/json" }),
    res.end('rodou')
})

server.listen(port, () => console.log(`server running on ${path}:${port}`))