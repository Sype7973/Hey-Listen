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
        completionDate: {
            type: Date,
            required: true,
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
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

module.exports = commissionSchema;