const mysql =require('mysql');
const express=require('express');
const bodyParser=require('body-parser');



const app=express();

app.use(bodyParser.json());


var mysqlConnection = mysql.createConnection({
host:'localhost',
user : 'root',
password:'passwordgiven',
database : 'herodb'
})

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('success');
    else
        console.log('failed@! \n Error: '+ JSON.stringify(err,undefined,2));    
})

app.listen(4000,console.log(`listening server on port 3000`));


const cors = require('cors');
  var corOptions={
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }


app.use(cors(corOptions))


app.get('/power',(req,res)=>{
  mysqlConnection.query(`SELECT * from power`,(err,rows,fields)=>{
      if(!err)
          res.send(rows);
      else   
          console.log(err);    
  })
});



app.get('/power/:id',(req,res)=>{
let id = req.params.id 
mysqlConnection.query(`SELECT * from power WHERE id=${id}`,(err,rows,fields)=>{
    if(!err)
        res.send(rows)
    else   
        console.log(err);    
})
});

//POST 

app.post('/power',(req,res)=>{
//onsole.log('req  body',req.body)
  
  const {id,name} = req.body
  mysqlConnection.query(`Insert into power(name) Values('${req.body.name}') `,(err, result)=>{
      if (err) throw err;
      res.json(result)
      console.log(result);
    });
})



app.delete('/power/:id', (req, res) => {
  let id = req.params.id
  mysqlConnection.query(`DELETE FROM power Where id=${id}`, function (err, rows, fields) {
    if (err)
      res.json({ msg: err.message });;
    console.log('deleted');

  });
})

app.put('/power/:id', (req, res) => {
  let id = req.params.id
  const name =req.body.name;
  mysqlConnection.query(`UPDATE power SET name = '${name}' WHERE id = '${id}'`, function (err, rows) {
    if (err)
      res.json({ msg: err.message });;
    res.json(rows)

  });
})

/////////////hero
app.get('/hero',(req,res)=>{
    mysqlConnection.query(`SELECT * from heros`,(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else   
            console.log(err);    
    })
});



app.get('/hero/:id',(req,res)=>{
  let id = req.params.id 
  mysqlConnection.query(`SELECT * from heros WHERE id=${id}`,(err,rows,fields)=>{
      if(!err)
          res.send(rows);
      else   
          console.log(err);    
  })
});

//POST 

app.post('/hero',(req,res)=>{
  //console.log('req  body',req.body)
    
    const {id,name} = req.body
    mysqlConnection.query(`Insert into heros(name) Values('${req.body.name}') `,(err, result)=>{
        if (err) throw err;
        res.json(result)
        console.log(result);
      });
})



app.delete('/hero/:id', (req, res) => {
    let id = req.params.id
    mysqlConnection.query(`DELETE FROM heros Where id=${id}`, function (err, rows, fields) {
      if (err)
        res.json({ msg: err.message });;
      console.log('deleted');
  
    });
  })

app.put('/hero/:id', (req, res) => {
    let id = req.params.id
    const name =req.body.name;
    mysqlConnection.query(`UPDATE heros SET name = '${name}' WHERE id = '${id}'`, function (err, rows) {
      if (err)
        res.json({ msg: err.message });;
      res.json(rows)
  
    });
  })
  
  /////hero powerr


app.get('/hero/power/:id',(req,res)=>{
  let id = req.params.id 
  mysqlConnection.query(`SELECT p.id,p.name from heropower hp, power p 
     WHERE hp.pid=p.id AND hid=${id}`,(err,rows,fields)=>{
      if(!err)
          res.send(rows);
      else   
          console.log(err);    
  })
  });

app.post('/heropower/',(req,res)=>{
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

app.delete('/heropower/:id', (req, res) => {
  let id = req.params.id
  res.json({id});
  //console.log("del id",id);
   mysqlConnection.query(`DELETE FROM heropower Where pid=${id}`, function (err, rows, fields) {
    if (err)
      res.json({ msg: err.message });;
    console.log('deleted');

  });
})