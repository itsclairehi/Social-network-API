const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought' 
        }
    ],
    friends: [{
        type: Schema.Types.ObjectId,
            ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false

});

//virtuals

UserSchema.virtual('friendCount').get(function () {
    //reduce takes an accumulator and current value parameter and walks through an array, adding to accumulator each time
    return this.friends.reduce((total, friend)=> total + friend.replies.length + 1, 0);
});
// create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;