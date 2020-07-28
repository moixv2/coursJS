const express = require('express');
const server = express();

server.use(express.static('statique'));
server.listen(3000,() => {
    console.log('server is running');
});