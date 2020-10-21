const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');

app.use(bodyParser());

const MongoClient = require('mongodb').MongoClient;
const connection_string = "mongodb+srv://abhi:abhi1234@cluster0.tbqxb.mongodb.net/todolist?retryWrites=true&w=majority";

MongoClient.connect(connection_string, function (err, client) {
        if (err) throw err
        var db = client.db('todolist')

        db.collection('tasks')
})

app.post('/api/addtask', function(req, res) {
    MongoClient.connect(connection_string, function (err, client) {
        if (err) throw err

        var db = client.db('todolist')

        //console.log(req.body)

        collection = db.collection('tasks')
        tasks_list = collection.insertOne(req.body)
            .then(result => {
                console.log(result)
            })
            .catch(err => console.error(err))
    })
    res.send("Task added!")
})

app.get('/api/gettasks', function(req, res) {
    MongoClient.connect(connection_string, function (err, client) {
        if (err) throw err

        var db = client.db('todolist')

        task_array = db.collection('tasks').find().toArray(function (err, result) {
            if (err) throw err
            console.log(result)
            res.send(result)
        })
    })
})

app.put('/api/edittask/:id', function(req, res) {
    MongoClient.connect(connection_string, function (err, client) {
        if (err) throw err

        var db = client.db('todolist')
        id = req.params.id
        var filter = {_id: id}
        var update = {
            $set: {
                name: req.body.name,
                desc: req.body.desc
            }
        }

        db.collection('tasks').updateOne(filter, update, function(err, res) {
            if (err) throw err
            console.log("updated task!")
            res.send('Task updated!')
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})