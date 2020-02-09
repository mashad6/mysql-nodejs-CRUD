var express = require('express');
var router = express.Router();
const mysqlConnection = require('../server')

const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.json());

router.get('/showall',(req,res)=>{
    mysqlConnection.query(`SELECT  h.name ,p.name from heropower hp, power p, heros h 
    WHERE hp.pid=p.id AND hp.hid=h.id`,(err,rows)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);    
    })
})//mistake^

router.get('/:id',(req,res)=>{
    let id = req.params.id 
    mysqlConnection.query(`SELECT p.id,p.name from heropower hp, power p 
       WHERE hp.pid=p.id AND hid=${id}`,(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else   
            console.log(err);    
    })
    });
  
  router.post('/addpower/',(req,res)=>{
    let pid = req.body.pid
    let hid = req.body.hid
  //  console.log(pid,hid);
    //res.json({pid,hid});
    console.log("here is your ids",pid,hid);
  
    mysqlConnection.query(`insert into heropower(hid,pid) VALUES('${hid}','${pid}')`,(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else   
            console.log(err);    
    })
  }
    );
  
  router.delete('/delpower/:id', (req, res) => {
    let id = req.params.id
    res.json({id});
    //console.log("del id",id);
     mysqlConnection.query(`DELETE FROM heropower Where pid=${id}`, function (err, rows, fields) {
      if (err)
        res.json({ msg: err.message });;
      console.log('deleted');
  
    });
  })

module.exports =router;