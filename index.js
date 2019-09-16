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


app.get('/hero',(req,res)=>{
    mysqlConnection.query(`SELECT * from hero`,(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else   
            console.log(err);    
    })
});
//POST 

app.post('/hero',(req,res)=>{
    
    const {id,name} = req.body
    mysqlConnection.query(`Insert into hero(id,name) Values('${id}','${name}') `,(err, result)=>{
        if (err) throw err;
        res.json(result)
        console.log(result);
      });
})



app.delete('/hero/:id', (req, res) => {
    let id = req.params.id
    mysqlConnection.query(`DELETE FROM hero Where id=${id}`, function (err, rows, fields) {
      if (err)
        res.json({ msg: err.message });;
      console.log('deleted');
  
    });
  })

app.put('/hero/:id', (req, res) => {
    let id = req.params.id
    const name =req.body.name;
    mysqlConnection.query(`UPDATE hero SET name = '${name}' WHERE id = '${id}'`, function (err, rows) {
      if (err)
        res.json({ msg: err.message });;
      res.json(rows)
  
    });
  })
