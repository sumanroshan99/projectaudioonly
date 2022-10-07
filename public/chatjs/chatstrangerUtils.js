import * as chatwss from "./chatwss.js";
import * as chatwebRTCHandler from "./chatwebRTCHandler.js";
import * as ui from "./ui.js";

let strangerCallType;

export const changeStrangerConnectionStatus = (status) => {
  const data = { status };
  chatwss.changeStrangerConnectionStatus(data);
};

export const getStrangerSocketIdAndConnect = (callType) => {
  strangerCallType = callType;
  chatwss.getStrangerSocketId();
};

export const connectWithStranger = (data) => {
  if (data.randomStrangerSocketId) {
    chatwebRTCHandler.sendPreOffer(strangerCallType, data.randomStrangerSocketId);
  } else {
    // no user is available for connection
    ui.showNoStrangerAvailableDialog();
  }
};
