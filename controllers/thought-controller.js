const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
            // If no pizza is found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { _id: body.UserId },
                    { $push: { thoughts: _id}},
                    { new: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No User found with this id!' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body} },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));    
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({_id: params.ThoughtId})
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: 'No Thought found with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.UserId },
                    { $pull: { thoughts: params.ThoughtId } },
                    { new: true }
                );
                })
                .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
        .then(dbReactionData => res.json(dbReactionData))
        .catch(err => res.json(err));
    }
    

//     deleteThought({ params }, res) {
//         Thought.findOneAndDelete({_id: params.id})
//             .then(dbThoughtData => {
//                 if(!dbThoughtData) {
//                     return res.status(404).json({ message: 'No Thought found with this id!' });
//                 }
//                 return User.findOneAndUpdate(
//                     { $pull: { thoughts: params.id } },
//                     { new: true }
//                 );
//             })
//             .then(dbUserData => {
//                 if (!dbUserData) {
//                     res.status(404).json({ message: 'No User found with this id!' });
//                     return;
//                 }
//                 res.json(dbUserData);
//                 })
//             .catch(err => res.status(400).json(err));
//     }
}



module.exports = thoughtController;