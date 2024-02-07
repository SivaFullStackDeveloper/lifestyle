const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const postRouter = require('./routes/post-route')
const userRouter = require('./routes/user-route')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(postRouter);
app.use(userRouter);


app.get('/',(req,res)=>{
    res.send("Hello world 123")
})

module.exports = app

