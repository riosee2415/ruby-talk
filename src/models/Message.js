import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Message = new Schema(
  {
    sendUser: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    receiveUser: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Message", Message, "Message");
