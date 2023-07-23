const { Schema, model } = require('mongoose');

const commissionSchema = new Schema(
    {
        commissionTitle: {
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
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        collaboratorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
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
        completionDate: {
            type: Date,
        },
        status: {
            type: Boolean,
            required: true,
            default: true,
        },
        rating: {
            type: Number,
        },
        review: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,

        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

module.exports = commissionSchema;