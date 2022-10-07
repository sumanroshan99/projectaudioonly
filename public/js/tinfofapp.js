import * as uhtmlts from "./uhtmlts.js";


let socketIO = null;

export const registerSocketEvents = (socket) => {
  socketIO = socket;


  socket.on("total-strangers", (data) => {
    console.log('total no of strangers');
    console.log(data);
    uhtmlts.updatestrangersnumbers(data);
  });

 
  

};

