var express = require('express');
var router = express.Router();
const mysqlConnection = require('../server')

const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({extended:true}))


//show
router.get('/show',(req,res)=>{
    mysqlConnection.query(`SELECT * from heros`,(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else   
            console.log(err);    
    })
});

//POST 

router.post('/hero',(req,res)=>{
    //console.log('req  body',req.body)
      
      const {id,name} = req.body
      mysqlConnection.query(`Insert into heros(name) Values('${req.body.name}') `,(err, result)=>{
          if (err) throw err;
          res.json(result)
          console.log(result);
        });
  })
  
  //delete
    
  router.delete('/hero/:id', (req, res) => {
      let id = req.params.id
      mysqlConnection.query(`DELETE FROM heros Where id=${id}`, function (err, rows, fields) {
        if (err)
          res.json({ msg: err.message });;
        console.log('deleted');
    
      });
    })
//update  
  router.put('/hero/:id', (req, res) => {
      let id = req.params.id
      const name =req.body.name;
      mysqlConnection.query(`UPDATE heros SET name = '${name}' WHERE id = '${id}'`, function (err, rows) {
        if (err)
          res.json({ msg: err.message });;
        res.json(rows)
    
      });
    })
    
  
module.exports =router;