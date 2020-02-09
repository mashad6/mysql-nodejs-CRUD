const express=require('express');
const bodyParser=require('body-parser');
const mysqlConnection = require('./server')
const hero= require('./routes/hero');
const power =require('./routes/power')
const heropower =require('./routes/hero-power');


const app=express();

app.use(bodyParser.json());
app.use('/hero',hero);
app.use('/power',power);
app.use('/heropower',heropower);

app.listen(4000,console.log(`listening server on port 4000`));


const cors = require('cors');
  var corOptions={
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }
app.use(cors(corOptions))



