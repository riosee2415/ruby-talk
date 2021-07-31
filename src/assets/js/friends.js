let globalReceivId = "";

const friendClickHandler = (receivId) => {
  msgBox = document.getElementById("msgBox-js");

  globalReceivId = receivId;

  if (msgBox.style.display === "flex") {
    msgBox.style.display = "none";
  } else {
    msgBox.style.display = "flex";
  }
};

const closeMsgBox = () => {
  msgBox = document.getElementById("msgBox-js");
  msgBox.style.display = "none";
};

const sendAction = () => {
  const msgContent = document.getElementById("msgContent-js");

  const formTag = document.createElement("form");
  formTag.action = "/sendMsg";
  formTag.method = "post";
  formTag.name = "sendMsgForm";

  const reveiveIdInput = document.createElement("input");
  reveiveIdInput.type = "text";
  reveiveIdInput.name = "reveiveId";
  reveiveIdInput.setAttribute("value", globalReceivId);

  const messageInput = document.createElement("input");
  messageInput.type = "text";
  messageInput.name = "msg";
  messageInput.setAttribute("value", msgContent.value);

  formTag.appendChild(reveiveIdInput);
  formTag.appendChild(messageInput);

  formTag.style.display = "none";
  document.body.appendChild(formTag);

  formTag.submit();
};
