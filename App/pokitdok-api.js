var express = require('express');
var app = express();
var fs = require("fs");
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  app.use(express.static('public'));
  app.use(function(req, res, next) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Credentials", "true");
   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  //and remove cacheing so we get the most recent comments
   res.setHeader("Cache-Control", "no-cache");
   next();
  });

  app.get('/index2.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index2.html" );
  })

  app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
  })


  app.get('/webgetzip/:zip',function(req,res){
    var url = 'mongodb://PDGroup462:ecTBtKvX1JOk2SFq@462project-shard-00-00-nnz7h.mongodb.net:27017,462project-shard-00-01-nnz7h.mongodb.net:27017,462project-shard-00-02-nnz7h.mongodb.net:27017/project?ssl=true&replicaSet=462Project-shard-0&authSource=admin';
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      var collection = db.collection('pokitdok');
      console.log(req.params.zip);
      var query = { 'locations.zipcode' : {'$regex': req.params.zip+'.*'}};
      collection.find(query).sort({'rank' : -1}).limit(5).toArray(function(err, docs){
        if(!err){
          db.close();
          console.log("found the following records");
          console.log(docs);
          var intCount = docs.length;
          if(intCount > 0){
            res.end(JSON.stringify(docs));
          }else{
            console.log('return none');
            res.end("None");
          }
        }else {console.log('error');}
      });
    });
  })

  app.get('/webgetspecialty/:specialty',function(req,res){
    var url = 'mongodb://PDGroup462:ecTBtKvX1JOk2SFq@462project-shard-00-00-nnz7h.mongodb.net:27017,462project-shard-00-01-nnz7h.mongodb.net:27017,462project-shard-00-02-nnz7h.mongodb.net:27017/project?ssl=true&replicaSet=462Project-shard-0&authSource=admin';
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      var collection = db.collection('pokitdok');
      console.log(req.params.zip);
      var query = { 'specialty_primary' : req.params.specialty};
      collection.find(query).sort({'rank' : -1}).limit(5).toArray(function(err, docs){
        if(!err){
          db.close();
          console.log("found the following records");
          console.log(docs);
          var intCount = docs.length;
          if(intCount > 0){
            res.end(JSON.stringify(docs));
          }else{
            console.log('return none');
            res.end("None");
          }
        }else {console.log('error');}
      });
    });
  })

  app.get('/webget',function(req,res){
    var url = 'mongodb://PDGroup462:ecTBtKvX1JOk2SFq@462project-shard-00-00-nnz7h.mongodb.net:27017,462project-shard-00-01-nnz7h.mongodb.net:27017,462project-shard-00-02-nnz7h.mongodb.net:27017/project?ssl=true&replicaSet=462Project-shard-0&authSource=admin';
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      var collection = db.collection('pokitdok');
      console.log(req.params.zip);
      console.log(req.params.specialty);
      collection.find().sort({'rank' : -1}).limit(5).toArray(function(err, docs){
        if(!err){
          db.close();
          console.log("found the following records");
          console.log(docs);
          var intCount = docs.length;
          if(intCount > 0){
            res.end(JSON.stringify(docs));
          }else{
            console.log('return none');
            res.end("None");
          }
        }else {console.log('error');}
      });
    });
  })

  app.get('/webget/:zip/:specialty',function(req,res){
    var url = 'mongodb://PDGroup462:ecTBtKvX1JOk2SFq@462project-shard-00-00-nnz7h.mongodb.net:27017,462project-shard-00-01-nnz7h.mongodb.net:27017,462project-shard-00-02-nnz7h.mongodb.net:27017/project?ssl=true&replicaSet=462Project-shard-0&authSource=admin';
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      var collection = db.collection('pokitdok');
      console.log(req.params.zip);
      console.log(req.params.specialty);
      var query = { 'locations.zipcode' : {'$regex': req.params.zip+'.*'}, 'specialty_primary' : req.params.specialty};
      collection.find(query).sort({'rank' : -1}).limit(5).toArray(function(err, docs){
        if(!err){
          db.close();
          console.log("found the following records");
          console.log(docs);
          var intCount = docs.length;
          if(intCount > 0){
            res.end(JSON.stringify(docs));
          }else{
            console.log('return none');
            res.end("None");
          }
        }else {console.log('error');}
      });
    });
  })

  app.get('/specialties',function(req,res){
    var url = 'mongodb://PDGroup462:ecTBtKvX1JOk2SFq@462project-shard-00-00-nnz7h.mongodb.net:27017,462project-shard-00-01-nnz7h.mongodb.net:27017,462project-shard-00-02-nnz7h.mongodb.net:27017/project?ssl=true&replicaSet=462Project-shard-0&authSource=admin';
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      var collection = db.collection('pokitdok');
      collection.distinct("specialty_primary", function(err, docs){
        if(!err){
          db.close();
          console.log("found the following specialties: ");
          console.log(docs);
          var intCount = docs.length;
          if(intCount > 0){
            res.end(JSON.stringify(docs));
          }else{
            console.log('return none');
            res.end("None");
          }
        }else console.log('error');
      });
    });
  })

  app.get('/specialties/:zip',function(req,res){
    var url = 'mongodb://PDGroup462:ecTBtKvX1JOk2SFq@462project-shard-00-00-nnz7h.mongodb.net:27017,462project-shard-00-01-nnz7h.mongodb.net:27017,462project-shard-00-02-nnz7h.mongodb.net:27017/project?ssl=true&replicaSet=462Project-shard-0&authSource=admin';
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      var collection = db.collection('pokitdok');
      collection.distinct("specialty_primary",{ 'locations.zipcode' : {'$regex': req.params.zip+'.*'}}, function(err, docs){
        if(!err){
          db.close();
          console.log("found the following specialties: ");
          console.log(docs);
          var intCount = docs.length;
          if(intCount > 0){
            res.end(JSON.stringify(docs));
          }else{
            console.log('return none');
            res.end("None");
          }
        }else console.log('error');
      });
    });
  })




var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
