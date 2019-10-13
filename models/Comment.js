const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = Comment = mongoose.model('Comment', commentSchema)