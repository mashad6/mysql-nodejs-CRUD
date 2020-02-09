var express = require('express');
var router = express.Router();
const mysqlConnection = require('../server')

const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.json());


//show

router.get('/show',(req,res)=>{
    mysqlConnection.query(`SELECT * from power`,(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else   
            console.log(err);    
    })
  });
  
  
  
  router.get('/power/:id',(req,res)=>{
  let id = req.params.id 
  mysqlConnection.query(`SELECT * from power WHERE id=${id}`,(err,rows,fields)=>{
      if(!err)
          res.send(rows)
      else   
          console.log(err);    
  })
  });
  
  //POST 
  
  router.post('/power',(req,res)=>{
  //onsole.log('req  body',req.body)
    
    const {id,name} = req.body
    mysqlConnection.query(`Insert into power(name) Values('${req.body.name}') `,(err, result)=>{
        if (err) throw err;
        res.json(result)
        console.log(result);
      });
  })
  
  //delete
  
  router.delete('/power/:id', (req, res) => {
    let id = req.params.id
    mysqlConnection.query(`DELETE FROM power Where id=${id}`, function (err, rows, fields) {
      if (err)
        res.json({ msg: err.message });;
      console.log('deleted');
  
    });
  })
  
  //update
  router.put('/power/:id', (req, res) => {
    let id = req.params.id
    const name =req.body.name;
    mysqlConnection.query(`UPDATE power SET name = '${name}' WHERE id = '${id}'`, function (err, rows) {
      if (err)
        res.json({ msg: err.message });;
      res.json(rows)
  
    });
  })
  
module.exports =router;
