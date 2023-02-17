const express = require("express");
const logger = require("morgan");
const mongoose=require("mongoose")
const createError = require("http-errors");

const contactRouter = require('./routes/contacts');

const app = express();
const dbconfig=require("./database/mongodb.json")
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/contact',contactRouter);

app.use((req,res,next) => {
    next(createError(404));
});
mongoose.connect(
   dbconfig.mongo.uri ,
    { useNewUrlParser:
    true ,
    useUnifiedTopology: true
    },
    ()=> console.log("Connected to DB") );
module.exports = app;



