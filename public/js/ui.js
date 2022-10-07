import * as constants from "./constants.js";
import * as elements from "./elements.js";

export const updatePersonalCode = (personalCode) => {
  const personalCodeParagraph = document.getElementById(
    "personal_code_paragraph"
  );
  personalCodeParagraph.innerHTML = personalCode;
};

export const updateLocalVideo = (stream) => {
  const localVideo = document.getElementById("local_video");
  localVideo.srcObject = stream;

  //});
};

//export const showVideoCallButtons = () => {
//  const personalCodeVideoButton = document.getElementById(
//    "personal_code_video_button"
//  );
//  const strangerVideoButton = document.getElementById("stranger_video_button");
//
//  showElement(personalCodeVideoButton);
//  showElement(strangerVideoButton);
//};

export const updateRemoteVideo = (stream) => {
  const remoteVideo = document.getElementById("remote_video");
  remoteVideo.srcObject = stream;
};

export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";

  const incomingCallDialog = elements.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );

  // removing all dialogs inside HTML dialog element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());

  dialog.appendChild(incomingCallDialog);
};

export const showCallingDialog = (rejectCallHandler) => {
  const callingDialog = elements.getCallingDialog(rejectCallHandler);

  // removing all dialogs inside HTML dialog element
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());

  dialog.appendChild(callingDialog);
};

export const updatestrangersnumbers = (data) => {
  
  var totalstrangers = document.getElementById('total-strangers');
 
  totalstrangers.innerHTML=totalstrangers.innerHTML = data ;
  

};

export const showNoStrangerAvailableDialog = () => {
  const infoDialog = elements.getInfoDialog(
    "No Stranger available",
    "Please try again later"
  );

  if (infoDialog) {
    const dialog = document.getElementById("dialog");
    dialog.appendChild(infoDialog);

    setTimeout(() => {
      removeAllDialogs();
    }, [4000]);
  }
};

export const showInfoDialog = (preOfferAnswer) => {
  let infoDialog = null;

  if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
    infoDialog = elements.getInfoDialog(
      "Call rejected",
      "Callee rejected your call"
    );
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
    infoDialog = elements.getInfoDialog(
      "Callee not found",
      "Please check personal code"
    );
  }

  if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
    infoDialog = elements.getInfoDialog(
      "Call is not possible",
      "Probably callee is busy. Please try again later"
    );
  }

  if (infoDialog) {
    const dialog = document.getElementById("dialog");
    dialog.appendChild(infoDialog);

    setTimeout(() => {
      removeAllDialogs();
    }, [4000]);
  }
};

export const removeAllDialogs = () => {
  const dialog = document.getElementById("dialog");
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
};

export const showCallElements = (callType) => {
  if (
    callType === constants.callType.CHAT_PERSONAL_CODE ||
    callType === constants.callType.CHAT_STRANGER
  ) {
    showChatCallElements();
  }

  if (
    callType === constants.callType.VIDEO_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_STRANGER
  ) {
    showVideoCallElements();
  }
};

const showChatCallElements = () => {
  const finishConnectionChatButtonContainer = document.getElementById(
    "finish_chat_button_container"
  );
  showElement(finishConnectionChatButtonContainer);

  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);
  //block panel
  showhangup();
  hidestrangervideobtn();
  showpositivealert();
  changebackgroundimg();
  
};

const showVideoCallElements = () => {
  const callButtons = document.getElementById("call_buttons");
  showElement(callButtons);

  //const placeholder = document.getElementById("video_placeholder");
  //hideElement(placeholder);

  //const remoteVideo = document.getElementById("remote_video");
  //showElement(remoteVideo);

  const newMessageInput = document.getElementById("new_message");
  showElement(newMessageInput);
  //block panel
  showhangup();
  hidestrangervideobtn();
  showpositivealert();
  shownegativealert2();
  changebackgroundimg();
  clearMessenger();
};




// ui messages




export const appendMessage = (message, right = false) => {
  if(message =='typing'){
    typingMessage();
  }
 else{

  const messagesContainer = document.getElementById("messages_container");
    //const messagesSaver = document.getElementById("messages_saver");
  const messageElement = right
    ? elements.getRightMessage(message)
    : elements.getLeftMessage(message);
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop=messagesContainer.scrollHeight;
  //messagesSaver.appendChild(messageElement);
    }
};

const typingMessage = () => {
  //const messagesContainer = document.getElementById("messages_container");
  //const wowmessage =elements.getStrangerTypingMessage();
  //messagesContainer.appendChild(wowmessage);setTimeout(() => {removeTypingDialog();}, [1000])
  const strangertyping = document.getElementById("strangertypingdialog");
  strangertyping.style.display = "block";setTimeout(() => {removeTypingDialog();}, [1000])
};

const removeTypingDialog =() => {

  const strangertyping = document.getElementById("strangertypingdialog");
  strangertyping.style.display = "none";

};

export const clearMessenger = () => {
  const messagesContainer = document.getElementById("messages_container");
  messagesContainer.querySelectorAll("*").forEach((n) => n.remove());
};

// recording




// ui after hanged up
export const updateUIAfterHangUp = (callType) => {
  //enableDashboard();

  // hide the call buttons
  if (
    callType === constants.callType.VIDEO_PERSONAL_CODE ||
    callType === constants.callType.VIDEO_STRANGER
  ) {
    const hangupbtn = document.getElementById("hang_up_button");
    hideElement(hangupbtn);
    const strangervideobtn = document.getElementById("stranger_video_button");
    showElement(strangervideobtn);
    const strangerchatbtn = document.getElementById("stranger_chat_button");
    showElement(strangerchatbtn);
    const alertpositive = document.getElementById("alert_positive");
    hideElement(alertpositive);
    shownegativealert();
    const messagescontainer = document.querySelector('.messages_container');
    messagescontainer.style.backgroundImage = "url('css/mutedmike.jpg')";
  } else {
    const chatCallButtons = document.getElementById(
      "finish_chat_button_container"
    );
    hideElement(chatCallButtons);
  }

  //const newMessageInput = document.getElementById("new_message");
  //hideElement(newMessageInput);
  //clearMessenger();
  
  
  
  //const remoteVideo = document.getElementById("remote_video");
  //showElement(remoteVideo);

  

  //hide remote video and show placeholder
  

  //const placeholder = document.getElementById("video_placeholder");
  //showElement(placeholder);
  removeAllDialogs();

};



// changing status of checkbox
export const updateStrangerCheckbox = (allowConnections) => {
  const checkboxCheckImg = document.getElementById(
    "allow_strangers_checkbox_image"
  );

  allowConnections
    ? showElement(checkboxCheckImg)
    : hideElement(checkboxCheckImg);
};

// ui helper functions

const enableDashboard = () => {
  const dashboardBlocker = document.getElementById("dashboard_blur");
  if (!dashboardBlocker.classList.contains("display_none")) {
    dashboardBlocker.classList.add("display_none");
  }
};

//const disableDashboard = () => {
//  const dashboardBlocker = document.getElementById("dashboard_blur");
//  if (dashboardBlocker.classList.contains("display_none")) {
//    dashboardBlocker.classList.remove("display_none");
//  }
//};

const showhangup = () => {
  const hangupblocker = document.getElementById("hang_up_button");
  if (hangupblocker.classList.contains("display_none")) {
    hangupblocker.classList.remove("display_none");
    }
};

const hidestrangervideobtn = () => {
  const strangervideobtnblocker = document.getElementById("stranger_video_button");
  if (!strangervideobtnblocker.classList.contains("display_none")) {
    strangervideobtnblocker.classList.add("display_none");
    }
};

 const showpositivealert = () => {
  const alertpositive = document.getElementById("alert_positive");
  if (alertpositive.classList.contains("display_none")) {
    alertpositive.classList.remove("display_none");
    }
};


 const shownegativealert = () => {
  const alertnegative = document.getElementById("alert_disconnect");
  if (alertnegative.classList.contains("display_none")) {
    alertnegative.classList.remove("display_none");
    }
    
};

const shownegativealert2 = () => {
  const alertnegative = document.getElementById("alert_disconnect");
  if (!alertnegative.classList.contains("display_none")) {
    alertnegative.classList.add("display_none");
    }
    
};

const changebackgroundimg = () => {

  const messagescontainer = document.querySelector('.messages_container');
  messagescontainer.style.backgroundImage = "url('css/finalmike.gif')";

}

const hideElement = (element) => {
  if (!element.classList.contains("display_none")) {
    element.classList.add("display_none");
  }
};

const showElement = (element) => {
  if (element.classList.contains("display_none")) {
    element.classList.remove("display_none");
  }
};
