const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {
        postTitle: {
            type: String,
            required: true,
        },
        postType: {
            type: String,
            required: true,
        },
        postDescription: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        budget: {
            type: Number,
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        },
    }
);

const Post = model('Post', postSchema);

module.exports = Post;


