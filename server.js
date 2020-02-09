const mysql =require('mysql');

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

module.exports =mysqlConnection;