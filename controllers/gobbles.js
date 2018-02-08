var User = require('../models/User');
var Gobble = require('../models/Gobble');
var Twit = require('twit');

function index(req, res) {
    
    if (req.user) { 
        req.user.populate('gobbles', function(err) { 
          res.render('index', {user: req.user })
        });
    } else {
        res.render('index', {user: null })
    }
}

function showAll(req, res) {
    Gobble.find({}, function(err, gobbles) {
        res.render('show', {gobbles: gobbles});
    });
}

function create(req, res) {
    User.find({}).populate('gobbles').exec(function(err, users) { console.log(users) })
    req.user.gobbles.push({text: req.body.gobble});
    req.user.save(function(err) {
        res.json(req.user);
    });
}

function deleteGobble(req, res) {
    Gobble.findByIdAndRemove(req.params.id, function(err, user){
        // res.redirect
    })
}

function update(req, res) {
    Gobble.findByIdAndUpdate(req.params.id, function(err, gobble) {
        res.render('/edit');
    });
}

function edit(req, res) {

}

module.exports = {
    index: index,
    create: create,
    delete: deleteGobble,
    update: update,
    showAll
};