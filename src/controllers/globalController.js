import User from "../models/User";
import Message from "../models/Message";
import mongoose from "mongoose";

export const testScreen = (req, res) => {
  res.render("base");
};

export const mainController = (req, res) => {
  const loginFlag = req.userLoginFlag || false;

  let isAuthenticated = false;

  if (loginFlag) {
    isAuthenticated = true;
  }

  if (isAuthenticated) {
    friendsController(req, res);
  } else {
    res.render("main");
  }
};

export const friendsController = async (req, res) => {
  const sess = req.session;

  if (!sess.userId) {
    mainController(req, res);
    return;
  }

  try {
    const loginUser = await User.findOne({ _id: sess.userId }).populate({
      path: "friends",
      model: User,
    });

    res.render("friends", { list: loginUser.friends });
  } catch (e) {
    console.log(e);
    mainController(req, res);
  }
};

export const messageController = (req, res) => {
  res.render("message");
};

export const profileController = (req, res) => {
  res.render("profile");
};

export const loginController = async (req, res) => {
  const sess = req.session;
  let loginFlag = false;

  const input_id = req.body.input_id;
  let input_pass = req.body.input_pass;
  input_pass = String(input_pass);

  try {
    const result = await User.find();

    Promise.all(
      result.map((user) => {
        if (user.userId === input_id && user.userPassword === input_pass) {
          loginFlag = true;
          sess.userId = user._id;
        }
      })
    );

    req.userLoginFlag = loginFlag;
    mainController(req, res);
  } catch (e) {
    console.log("[SYSTEM] 사용자가 로그인을 시도하였지만 에러가 발생했습니다.");
    mainController(req, res);
  }
};

export const sendMessageController = async (req, res) => {
  const sess = req.session;

  const {
    body: { reveiveId, msg },
  } = req;

  const sendUser = sess.userId;

  try {
    const obid_sendUser = mongoose.Types.ObjectId(sendUser);
    const obid_receiveUser = mongoose.Types.ObjectId(reveiveId);

    const msgResult = await Message.create({
      sendUser: obid_sendUser,
      receiveUser: obid_receiveUser,
      content: msg,
    });

    const sendUserObj = await User.findOne({ _id: sendUser });
    sendUserObj.sMsgList.push(msgResult._id);
    sendUserObj.save();

    const receiveUserObj = await User.findOne({ _id: reveiveId });
    receiveUserObj.rMsgList.push(msgResult._id);
    receiveUserObj.save();

    friendsController(req, res);
  } catch (error) {
    console.log(error);
    throw Error("메세지 전송에 실패했습니다.");
  }
};
