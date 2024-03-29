const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
   res.end('Hello World');
});

server.listen(port, () => {
   console.log(`Server running on port ${port}`);
}).on('error', (err) => {
   if (err.code === 'EADDRINUSE') {
     console.error(`Port ${port} is already in use`);
   } else {
     console.error(err);
   }
});
