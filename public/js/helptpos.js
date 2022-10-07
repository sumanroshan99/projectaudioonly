
import * as tinfofapp from "./tinfofapp.js";

// initialization of socketIO connection
const socket = io("/");
tinfofapp.registerSocketEvents(socket);




