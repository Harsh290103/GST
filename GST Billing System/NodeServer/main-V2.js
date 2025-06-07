const mysql = require('mysql');
const express = require('express');
var app = express();

var dbConnectionDetails = {  
                             host     : 'localhost',
                             port :     3306, 
                             user     : 'root',
                             password : 'manager',
                             database : 'company'
                          };

var connection =  mysql.createConnection(dbConnectionDetails);


app.use((request, response, next)=>
{
    //Cors code
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Headers", "*")
    response.setHeader("Access-Control-Allow-Methods", "*")
    response.setHeader("content-type","application/json");
    next();
});

app.use(express.json()); //this will convert request body from stream to JSON 

app.get("/emps",(request, response)=>
{
    connection.connect();
    connection.query("select * from Emp",(error, result)=>
    {
       // console.log(result);
        if(error==null)
        {
             response.write(JSON.stringify(result));
        }
        else
        {
             response.write(JSON.stringify(error));
        }
        connection.end();
        response.end();
    });
});

app.post("/emps",(request, response)=>
{
    connection.connect();

    //var name = 'Kailas';
    //var address = 'Satara';
    //var queryText = `insert into Emp(Name, Address) values('${name}', '${address}');`;

    var queryText = `insert into Emp(Name, Address) 
                      values('${request.body.name}', '${request.body.address}');`;

    console.log("query generated is ");
    console.log(queryText);

    connection.query(queryText,(error, result)=>
    {
       // console.log(result);
        if(error==null)
        {
             response.write(JSON.stringify(result));
        }
        else
        {
             response.write(JSON.stringify(error));
        }
        connection.end();
        response.end();
    });
});

app.put("/emps/:No",(request, response)=>
{
    connection.connect();

    var queryText = `update Emp set Name = '${request.body.name}', 
                                    Address = '${request.body.address}' 
                                    where No = ${request.params.No};`;

    console.log("query generated is ");
    console.log(queryText);
    
    connection.query(queryText,(error, result)=>
    {
       // console.log(result);
        if(error==null)
        {
             response.write(JSON.stringify(result));
        }
        else
        {
             response.write(JSON.stringify(error));
        }
        connection.end();
        response.end();
    });
});

app.delete("/emps/:No",(request, response)=>
{
    connection.connect();

    var queryText = `delete from Emp where No = ${request.params.No};`;

    console.log("query generated is ");
    console.log(queryText);
    
    connection.query(queryText,(error, result)=>
    {
       // console.log(result);
        if(error==null)
        {
             response.write(JSON.stringify(result));
        }
        else
        {
             response.write(JSON.stringify(error));
        }
        connection.end();
        response.end();
    });
});

// app.get("/admin", ()=>{});
// app.post("/admin", ()=>{});
// app.put("/admin", ()=>{});
// app.delete("/admin", ()=>{});

// app.get("/customer", ()=>{});
// app.post("/customer", ()=>{});
// app.put("/customer", ()=>{});
// app.delete("/customer", ()=>{});

app.listen(9000, ()=>{console.log("Server started listening at port 9000")})