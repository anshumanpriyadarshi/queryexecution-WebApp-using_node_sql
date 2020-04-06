
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const Swal = require('sweetalert2');
const mysql = require('mysql');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'anshu',
  password : 'mysql123',
  database : 'fairdb'
});

connection.connect();


app.get("/",(req,res)=>{
    res.render("landing");
});



app.post("/query",(req,res)=>{

  console.log(req.body.text);
  
    let query = req.body.text;

          res.redirect("/query/" + query);
 
    
})


app.get("/query/:text",(req,res)=>{
  
  query = req.params.text;
  

  try{
    connection.query(query, function (error, results, fields) {
      let checker = query.substring(0,3)
      if (error){
        console.log("Query not valid");
        return res.redirect("/");
      }
      if(checker.toLowerCase() === "use"){
        
        return res.redirect("/");
        
      }

      else{
            res.render("query.ejs",{results : results});
            
      }
  
      
    });

  }catch(err){
    res.redirect("/");
  }


});
 




app.listen(3000,()=>{
   console.log("started"); 
});