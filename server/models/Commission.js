const { Schema, model } = require('mongoose');

const commissionSchema = new Schema(
    {
        commisisonTitle: {
            type: String,
            required: true,
        },
        commissionType: {
            type: String,
            required: true,
        },
        commissionDescription: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        budget: {
            type: Number,
            required: true,
        },
        completionDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: false,
        },
        rating: {
            type: Number,
        },
        review: {
            type: String,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

module.exports = commissionSchema;