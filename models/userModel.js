import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      minLength: 8,
      required: true,
    },

    profilePic: {
      type: String,
      default:
        "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
    },

    followers: {
      type: [String],
      default: [],
    },

    following: {
      type: [String],
      default: [],
    },

    bio: {
      type: String,
      default: "Hey! I am using this amazing platform.",
      maxLength: [200, "Bio cannot be more than 200 characters"],
    },

    isFrozen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
