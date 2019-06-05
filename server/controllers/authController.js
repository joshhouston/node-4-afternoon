const theUsers = require('../models/users');
let id = 1;

module.exports = {
    login: function(req, res){
        const {session} = req;
        const {username, password} = req.body;

        const user = theUsers.find(user => user.username === username && user.password === password)

        if(user) {
            session.user.username = user.username;
            res.status(200).send(session.user)
        }else {
            res.status(500).send('nope')
        }
    },

    register: function(req, res) {
        const {session} = req;
        const {username, password} = req.body;

        theUsers.push({id, username, password});
        id++

        session.user.username = username;

        res.status(200).send(session.user)
    },

    signout: function(req, res) {
        req.session.destroy();
        res.sendStatus(200).send(req.session);
    },

    getUser: function(req, res) {
        const {session} = req;
        res.status(200).send(session.user)
    }
}