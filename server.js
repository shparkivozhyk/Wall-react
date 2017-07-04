const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.connect('mongodb://shparkivozhyk:wallreact@ds149132.mlab.com:49132/wall');
let port = process.env.PORT || 3000;

let Note = mongoose.model('Note', {
    note : String
});
app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.get('/notes', function(req, res) {
    Note.find(function(err, notes) {
        if (err) {
            res.send(err);
        }
        res.json(notes); 
    });
});
app.post('/notes', function(req, res) {
    Note.create({
        note : req.body.note
    }, function(err, note) {
        if (err) {
            res.send(err);
        }
        Note.find(function(err, notes) {
            if (err) {
                res.send(err);
            }   
            res.json(notes);
        });
    });
});
app.put('/notes/:note_id', function(req, res) {
    Note.update({_id : req.params.note_id}, { "note" : req.body.note }, function(err, note) {
        if (err) {
            res.send(err);
        }
        Note.find(function(err, notes) {
            if (err) {
                res.send(err);
            }
            res.json(notes);
        });
    });
});
app.delete('/notes/:note_id', function(req, res) {
    Note.remove({
        _id : req.params.note_id
    }, function(err, note) {
        if (err) {
            res.send(err);
        }
        Note.find(function(err, notes) {
            if (err) {
                res.send(err);
            }    
            res.json(notes);
        });
    });
});


app.use(express.static('public'));
console.log(port);
app.listen(port);
console.log('app listening');