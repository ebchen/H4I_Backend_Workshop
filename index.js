const express = require('express')
const app = express()
const port = 3000

var MongoClient = require('mongodb').MongoClient
connection_string = 'mongodb+srv://abhi:abhi1234@cluster0.tbqxb.mongodb.net/<dbname>?retryWrites=true&w=majority'

MongoClient.connect(connection_string, function (err, client) {
        if (err) throw err

        var db = client.db('todolist')

        db.collection('tasks').find().toArray(function (err, result) {
            if (err) throw err
            console.log(result)
        })
    })

app.post('/addtask', function(req, res) {
    MongoClient.connect(connection_string, function (err, client) {
        if (err) throw err

        var db = client.db('todolist')

        db.collection('tasks').insertOne(req.body)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.error(err))
    })
})

app.get('/gettasks', function(req, res) {
    MongoClient.connect('mongodb://localhost:27017/todolist', function (err, client) {
        if (err) throw err

        var db = client.db('todolist')

        db.collection('tasks').find().toArray(function (err, result) {
            if (err) throw err
            console.log(result)
        })
    })
})