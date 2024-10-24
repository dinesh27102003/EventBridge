const express=require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const oneDay = 3000 * 60 * 60 * 24;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'Assami1$',
    resave: false,
    cookie: {maxAge: oneDay},
    saveUninitialized: false,
  }));
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Assami1$',
    database: 'eventbridge'
})
app.listen(3002,()=>{
    console.log('Running on port 3002')
})

app.post('/signup', (req, res) => {
    //const { name, age, email, password } = req.body;
    const sql1 = `INSERT INTO ORGANIZERS (name,age,email,password) values (?)`;
    const values = [
        req.body.name,
        req.body.age,
        req.body.email,
        req.body.password
    ]
    const email= req.body.email;
    const sql2 = "INSERT INTO users(`name`,`age`,`email`,`password`) VALUES (?)";
    connection.query(sql2, [values], (error, data) => {
      if (error) {
        console.error(error);
        return res.json({ error: 'Internal server error' });
      }
      // generate JWT token for the new user
      const token = jwt.sign({ email }, 'your_secret_key');
      res.json({ success: true, token });
    });
    connection.query(sql1,[values],(err,res)=>{
        if(err) console.log("Error insertion");
        console.log("Inserted into organizers");
    })
    
  });
  app.post('/login', (req, res) => {
    const values = [
        req.body.email,
        req.body.password
    ]
    const sql = "SELECT * FROM USERS WHERE `EMAIL` = ? AND `PASSWORD` = ?";
    connection.query(sql, [req.body.email,req.body.password], (error, data) => {
      if (error) {
        console.error(error);
        return res.json({ error: 'Internal server error' });
      }
      if(data.length >0){
        console.log("Login successful");
        const email= data[0].Email;
        const token = jwt.sign({ email: email }, 'your_secret_key');
        console.log(token);
        res.status(200).json({ success: true, token, email: email,data: data[0] });
      }
      else if(data.length === 0) {
        return res.json({ error: 'Invalid email or password' });
      }
    });
});
app.post('/dashboard', (req, res) => {
    req.session.destroy((err,data) => {
      if (err) {
        console.log(err);
        return res.json('Internal error');
      }
      console.log("Processing logout");
      return res.json('Success');
    });
  });

app.post('/dashboard/createevent',(req,res)=>{
    console.log("Call here");   
    const sql1= "INSERT INTO events(`title`,`orgname`,`venue`,`date`,`orgemail`,`accommodation`,`type`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.name,
        req.body.venue,
        req.body.date,
        req.body.email,
        req.body.accommodation,
        req.body.type
    ]
    console.log(sql1);
    connection.query(sql1,[values],(err,result)=>{
        if(err){
            return res.json('Error');
        }
        return res.json('Success');
    });
  });

  app.get("/dashboard/fetch",(req,res)=>{
    const sqlq="SELECT EVENTID,TITLE,VENUE,DATE,TIMINGS,ACCOMMODATION,TYPE FROM EVENTS";
    
    connection.query(sqlq,(err,data)=>{
        console.log("Value sent");
        console.log(data);
        res.send(data);
    })
  });

  app.get("/dashboard/hostedevents", (req, res) => {
    const modname = req.query.name; // retrieve the modname query parameter
    console.log("Hi this is ",modname);
    const sql = "SELECT ORGNAME,EVENTID,TITLE,VENUE,DATE, ACCOMMODATION,TYPE FROM EVENTS where ORGNAME = ?";
    const sqlq1 ="SELECT EVENTS.EVENTID, EVENTS.TITLE, EVENTS.VENUE, EVENTS.DATE, EVENTS.ACCOMMODATION, EVENTS.TYPE FROM EVENTS, ORGANIZERS WHERE EVENTS.ORGEMAIL = ORGANIZERS.EMAIL AND EVENTS.ORGNAME = ?";
    connection.query(sql, [modname] ,(err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal server error");
      } else {
        console.log("This is ",modname);
        console.log("hosted events sent");
        res.send(data);
      }
    });
  });
  app.get("/dashboard/participatedevents", (req, res) => {
    const modname = req.query.name; // retrieve the modname query parameter
    console.log("Inside ",modname);
    const sql = "select eventid,title,venue,date,timings,orgemail,accommodation,type from events where eventid in (select eventid from eventregistration where attname = ?)";
    connection.query(sql, [modname] ,(err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal server error");
      } else {
        console.log("Participated ",modname);
        console.log("participated events sent");
        res.send(data);
      }
    });
  });


  app.get("/dashboard/upcomingevents",(req,res)=>{
    const sqlq="SELECT EVENTID,TITLE,VENUE,DATE,TIMINGS,ACCOMMODATION,TYPE FROM EVENTS";
    
    connection.query(sqlq,(err,data)=>{
        console.log("Value sent");
        console.log('Inside the upcoming events route');
        console.log(data);
        res.send(data);
    })
  });
  

  app.post("/dashboard/eventregister",(req,res)=>{
    console.log("Event register");   
    const sqlqq= "INSERT INTO EVENTREGISTRATION(`eventid`,`attname`,`attemail`,`accommodation`,`age`) VALUES (?)";
    const values = [
        req.body.eventid,
        req.body.name,
        req.body.email,
        req.body.accommodation,
        req.body.age
    ];
    console.log(sqlqq);
    console.log("Hey there, where's values ",values);
    //console.log(values);
    connection.query(sqlqq,[values],(err,data)=>{
        if(err){
            console.log(err);
            return res.json("Error");
        }
        return res.json('Success');
        
        
    });
  });
  app.get("/dashboard/updateprofile/fetch",(req,res)=>{
    console.log("Fetching update");
    const sqlq = "SELECT * from USERS where Name = ? ";
    const modname = req.query.name;
    console.log("Name fetched for is ",modname);
    connection.query(sqlq, [modname] ,(err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal server error");
      } else {
        console.log("Done fetching ",modname);
        console.log(data);
        res.send(data);
      }
    });
  });
  
  app.post("/dashboard/updateprofile/update",(req,res)=>{
    console.log("Updating values");
    const quer = "UPDATE USERS SET EMAIL= ? where NAME = ?";
    const values=[
      req.body.email,
      req.body.prevname
    ];
    console.log("values is ",values);
    connection.query(quer,values,(err,result)=>{
      if(err){
          console.log(err);
          return res.json('Error');
      }
      console.log("Value successfully updated");
      return res.json('Success');
    });
    

  });

  app.delete("/dashboard/delete/:eventid",(req,res)=>{
    const eventids = req.params.eventid;
    const sqld = "DELETE FROM EVENTS WHERE EVENTID = ?";
    connection.query(sqld,eventids,(err,result,fields)=>{
      if(err){
        console.log(err);
        return;
      }
      else console.log("Deleted successfully");
    })
  })
