const { Schema, model, Types } = require('mongoose');
var dayjs = require('dayjs')


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //format timestamp
        get: createdAtVal => dayjs(createdAtVal).format('MM/DD/YYYY')

    }
},
    {
        toJSON: {
            getters: true
        },
        // id: false
    }
)

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280

    },
    createdAt: {
        type: Date,
        default: Date.now,
        //format timestamp
        get: createdAtVal => dayjs(createdAtVal).format('MM/DD/YYYY')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    })

ThoughtSchema.virtual('reactionCount').get(function () {
    //reduce takes an accumulator and current value parameter and walks through an array, adding to accumulator each time
    // return this.reactions.reduce((total, reaction) => total + reaction.replies.length + 1, 0);
    return this.reactions.length
});



const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;