import * as store from "./store.js";
import * as chatwss from "./chatwss.js";
import * as chatwebRTCHandler from "./chatwebRTCHandler.js";
import * as chatstrangerUtils from "./chatstrangerUtils.js";
import * as constants from "./constants.js";
import * as ui from "./ui.js";


// initialization of socketIO connection
const socket = io("/");
chatwss.registerSocketEvents(socket);



//register event listener for personal code copy button
//const personalCodeCopyButton = document.getElementById(
//  "personal_code_copy_button"
//);
//personalCodeCopyButton.addEventListener("click", () => {
//  const personalCode = store.getState().socketId;
//  navigator.clipboard && navigator.clipboard.writeText(personalCode);
//});

// register event listeners for connection buttons

const personalCodeChatButton = document.getElementById(
  "personal_code_chat_button"
);

const personalCodeVideoButton = document.getElementById(
  "personal_code_video_button"
);

personalCodeChatButton.addEventListener("click", () => {
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.CHAT_PERSONAL_CODE;

  chatwebRTCHandler.sendPreOffer(callType, calleePersonalCode);
});

personalCodeVideoButton.addEventListener("click", () => {
  const calleePersonalCode = document.getElementById(
    "personal_code_input"
  ).value;
  const callType = constants.callType.VIDEO_PERSONAL_CODE;

  chatwebRTCHandler.sendPreOffer(callType, calleePersonalCode);
  
});

const strangerChatButton = document.getElementById("stranger_chat_button");
strangerChatButton.addEventListener("click", () => {
  chatstrangerUtils.getStrangerSocketIdAndConnect(constants.callType.CHAT_STRANGER);
});




function remainchecked()  {
  const checkbox = document.getElementById("allow_strangers_checkbox");
  const checkboxState = store.getState().allowConnectionsFromStrangers;
  ui.updateStrangerCheckbox(!checkboxState);
  store.setAllowConnectionsFromStrangers(true);
  chatstrangerUtils.changeStrangerConnectionStatus(true);
};

remainchecked();

// register event for allow connections from strangers
// const checkbox = document.getElementById("allow_strangers_checkbox");
// checkbox.addEventListener("click", () => {
//  const checkboxState = store.getState().allowConnectionsFromStrangers;
//  ui.updateStrangerCheckbox(!checkboxState);
//  store.setAllowConnectionsFromStrangers(!checkboxState);
//  chatstrangerUtils.changeStrangerConnectionStatus(!checkboxState);
//});

// event listeners for video call buttons


//switchForScreenSharingButton.addEventListener("click", () => {
//  const screenSharingActive = store.getState().screenSharingActive;
//  chatwebRTCHandler.switchBetweenCameraAndScreenSharing(screenSharingActive);
//});

// messenger

const newMessageInput = document.getElementById("new_message_input");
newMessageInput.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "Enter") {
    chatwebRTCHandler.sendMessageUsingDataChannel(event.target.value);
    ui.appendMessage(event.target.value, true);
    newMessageInput.value = "";
  }
});

const sendMessageButton = document.getElementById("send_message_button");
sendMessageButton.addEventListener("click", () => {
  const message = newMessageInput.value;
  chatwebRTCHandler.sendMessageUsingDataChannel(message);
  ui.appendMessage(message, true);
  newMessageInput.value = "";
});

// recording

//const startRecordingButton = document.getElementById("start_recording_button");
//startRecordingButton.addEventListener("click", () => {
//  recordingUtils.startRecording();
//  ui.showRecordingPanel();
//});

//const stopRecordingButton = document.getElementById("stop_recording_button");
//stopRecordingButton.addEventListener("click", () => {
//  recordingUtils.stopRecording();
//  ui.resetRecordingButtons();
//});

//const pauseRecordingButton = document.getElementById("pause_recording_button");
//pauseRecordingButton.addEventListener("click", () => {
//  recordingUtils.pauseRecording();
//  ui.switchRecordingButtons(true);
//});

//const resumeRecordingButton = document.getElementById(
//  "resume_recording_button"
//);
//resumeRecordingButton.addEventListener("click", () => {
//  recordingUtils.resumeRecording();
//  ui.switchRecordingButtons();
//});

// hang up

const hangUpButton = document.getElementById("hang_up_button");
hangUpButton.addEventListener("click", () => {
 
  chatwebRTCHandler.handleHangUp();
 
});

const Stopbtn = document.getElementById("stranger_video_button");
document.addEventListener('keydown', function(event){
  if(event.key === "Escape"){

    if (Stopbtn.classList.contains("display_none")) {

      chatwebRTCHandler.handleHangUp();
      
       }
       else {
        chatstrangerUtils.getStrangerSocketIdAndConnect(
          constants.callType.VIDEO_STRANGER
        ); 
       }
    }
    
    
 
  });



//const hangUpChatButton = document.getElementById("finish_chat_call_button");
//hangUpChatButton.addEventListener("click", () => {
//  chatwebRTCHandler.handleHangUp();
//});


const videorecordingbuttons = document.getElementById("video_recording_buttons");


//videorecordingbuttons.addEventListener("click", () => {
 
//  strangerVideoButton.classList.display = "none";
//});

