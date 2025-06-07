const express = require('express');
var app =express.Router();

app.get("/", (request, response)=>{response.send ("GET for customer called.")});
app.post("/", (request, response)=>{response.send ("POST for customer called.")});
app.put("/", (request, response)=>{response.send ("PUT for customer called.")});
app.delete("/", (request, response)=>{response.send ("Delete for customer called.")});

module.exports = app;