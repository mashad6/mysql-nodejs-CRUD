const express = require('express');
const router = express.Router();


const app=express();

app.get('/hero',(req,res)=>{
  mysqlConnection.query(`SELECT * from heros`,(err,rows,fields)=>{
      if(!err)
          res.send(rows);
      else   
          console.log(err);    
  })
});


// //POST 

// router.post('/hero',(req,res)=>{
//     const {name}=req.body
//     conn.query(`Insert into hero(name) Values('${name}')`,(err,result)=>
//     {
//         if(err) throw err;
//         res.json(result)
//         console.log(result);
//     });
// })



// app.delete('/hero/:id', (req, res) => {
//     let id = req.params.id
//     conn.query(`DELETE FROM hero Where id=${id}`, function (err, rows, fields) {
//       if (err)
//         res.json({ msg: err.message });;
//       res.json(rows)
  
//     });
//   })

// app.put('/hero/:id', (req, res) => {
//     let id = req.params.id
//     const name =req.body.name;
//     conn.query(`UPDATE hero SET name = '${name}' WHERE id = '${id}'`, function (err, rows) {
//       if (err)
//         res.json({ msg: err.message });;
//       res.json(rows)
  
//     });
//   })
