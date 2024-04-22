const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const commissionSchema = require("./Commission");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
        "Must use a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      match: [
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
      ],
    },
    userType: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    musicLinks: {
      type: [String],
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    commissionIds: [{ type: Schema.Types.ObjectId, ref: "Commission" }],
    conversations: [
      {
        conversationId: {
          type: Schema.Types.ObjectId,
          ref: 'Conversation',
        },
        otherUsername: {
          type: String,
          required: true,
        },
        otherUserId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("commissionCount").get(function () {
  return this.commissionSchema.length;
});

const User = model("User", userSchema);

module.exports = User;
