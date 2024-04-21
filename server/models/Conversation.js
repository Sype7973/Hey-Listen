const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for messages
const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Define the schema for conversations
const conversationSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  messages: [messageSchema], // Embed messages directly in the conversation
  // Additional fields for the conversation can be added here
});

// Create the Conversation model using the schema
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;