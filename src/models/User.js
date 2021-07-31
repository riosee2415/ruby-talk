import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    avatar: {
      type: String,
      requied: true,
    },
    nickname: {
      type: String,
      requied: true,
    },
    userId: {
      type: String,
      requied: true,
    },
    userPassword: {
      type: String,
      requied: true,
    },
    statusMessage: {
      type: String,
      requied: true,
    },
    friends: [
      {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    sMsgList: [
      {
        ref: "Message",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    rMsgList: [
      {
        ref: "Message",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model(`User`, User, `User`);
