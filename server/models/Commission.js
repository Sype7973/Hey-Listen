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
        deadline: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Commission = model('Commission', commissionSchema);

module.exports = Commission;