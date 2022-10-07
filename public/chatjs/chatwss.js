import * as store from "./store.js";
import * as ui from "./ui.js";
import * as chatwebRTCHandler from "./chatwebRTCHandler.js";
import * as chatstrangerUtils from "./chatstrangerUtils.js";
import * as constants from "./constants.js";

let socketIO = null;

export const registerSocketEvents = (socket) => {
  socketIO = socket;

  socket.on("connect", () => {
    store.setSocketId(socket.id);
    ui.updatePersonalCode(socket.id);
  });

  socket.on("pre-offer", (data) => {
    
    chatwebRTCHandler.handlePreOffer(data);
    
  });

  socket.on("pre-offer-answer", (data) => {
    chatwebRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on("user-hanged-up", () => {
    chatwebRTCHandler.handleConnectedUserHangedUp();
  });

  socket.on("total-strangers", (data) => {
    
    ui.updatestrangersnumbers(data);
  });

  socket.on("webRTC-signaling", (data) => {
    switch (data.type) {
      case constants.webRTCSignaling.OFFER:
        chatwebRTCHandler.handleWebRTCOffer(data);
        break;
      case constants.webRTCSignaling.ANSWER:
        chatwebRTCHandler.handleWebRTCAnswer(data);
        break;
      case constants.webRTCSignaling.ICE_CANDIDATE:
        chatwebRTCHandler.handleWebRTCCandidate(data);
        break;
      default:
        return;
    }
  });

  socket.on("stranger-socket-id", (data) => {
    console.log('coming 1');
    chatstrangerUtils.connectWithStranger(data);
  });
  socket.on("total-strangers",(totalstrangers)=>{

   
    ui.updatestrangersnumbers(totalstrangers);

  });
  

};

export const sendPreOffer = (data) => {
  console.log("coming 3 at wss");
  socketIO.emit("pre-offer", data);

};

export const sendPreOfferAnswer = (data) => {
  socketIO.emit("pre-offer-answer", data);
};

export const sendDataUsingWebRTCSignaling = (data) => {
  socketIO.emit("webRTC-signaling", data);
};

export const sendUserHangedUp = (data) => {
  socketIO.emit("user-hanged-up", data);
};

export const changeStrangerConnectionStatus = (data) => {
  socketIO.emit("stranger-connection-status", data);
};

export const getStrangerSocketId = () => {
  socketIO.emit("get-stranger-socket-id");
};
