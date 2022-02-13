const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
            // If no pizza is found, send 404
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id}, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend( { params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $push: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteFriend( { params }, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
}


module.exports = userController;