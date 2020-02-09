var express = require('express');
var router = express.Router();
var mysql = require('../index.js');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}))
router.get('/',(req,res)=>{
    res.locals.connection.query(`SELECT * from heros`,(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else   
            console.log(err);    
    })
});
module.exports =router;