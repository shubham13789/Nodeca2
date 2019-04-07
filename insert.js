var mysql = require('mysql');
var express = require("express");
var App = express();
var bodyparser = require("body-parser");

App.use(bodyparser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "exam"
});

con.connect();
App.get("/",function(req,res){
  query = "SELECT * FROM book;";
  res.writeHead(200,{"Content-Type":"application/json"});
  con.query(query,function(error,data,result){
      if(error){
          console.log(stringify(error))
      }else{
          console.log(data)
          let sdata=JSON.stringify(data);
          res.write(sdata);
          res.end();
      }

  });

  


})


App.post("/", function(req, res) {
  console.log("someone has requested the server to post");
  console.log(req.body);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write("thanks");
  res.end();

  var name = req.body.name;
  var isbn = req.body.isbn;
  var author = req.body.author;

  var sql_query =
    "INSERT INTO book (name,author,isbn) VALUES ('" +name+"','" +author+"','" +isbn+"');";

  con.query(sql_query, function(error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(data));
    }
  });
});



App.listen(8080);