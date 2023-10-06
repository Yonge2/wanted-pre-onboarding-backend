import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/boards', require('/'));

app.listen(3000, ()=>{
    console.log('server start');
})