const { User, Thought } = require('../models');

// define get, post etc functions here

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get single thought
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
    //create thought and add to user
    addThought({ params, body }, res) {
        console.log(body);
        console.log(params)
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
                    .then(dbUserData => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'no user found with that id!' })
                            return
                        }
                        res.json(dbUserData)
                    })
                    .catch(err => res.json(err))
            })

    },
    //update thought DO I HAVE TO UPDATE IN USER TOO?
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    //reactions routes
    //create reaction
    addReaction({ params, body }, res,) {
        console.log(body);
        
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }

        )
            .then(dbReactionData => {
                if (!dbReactionData) {
                    res.status(404).json({ message: 'no Thought found with this id' })
                    return
                }
                res.json(dbReactionData)
            })
            .catch(err => res.json(err))
    },
    //remove Reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    },
}

module.exports = thoughtController;