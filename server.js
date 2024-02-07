const http = require('http');
const app = require('./app');

const server = http.createServer(app);


server.listen(2000,(req,res)=>{
console.log('server started at port 2000')
});