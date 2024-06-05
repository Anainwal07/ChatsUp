import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});


//Socket Management
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: {socketId , status}}

const sendResponseToSender = (senderSocketId, message) => {
    io.to(senderSocketId).emit('mockLLMResponse', { message });
  };
  

//Socket EvenListeners
io.on("connection", (socket) => {
	console.log("A user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

    // Update user status based on client-side actions
    socket.on("setUserStatus", (status) => {
        if (status === "AVAILABLE" || status === "BUSY") {
        userSocketMap[userId].status = status;
        io.emit("updateUserStatus", { userId, status });
        }
    });

    if (!userSocketMap[userId]) {
        userSocketMap[userId] = { socketId: socket.id, status: "AVAILABLE" };
    } else {
        userSocketMap[userId].socketId = socket.id;
    }

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});

    socket.on("chatMessage", ({ recipientId, message }) => {
        const recipient = userSocketMap[recipientId];
    
        if (!recipient) {
          // Handle recipient not found
          io.to(socket.id).emit("recipientNotFound", { message: "Recipient not online." });
        } else {
          if (userSocketMap[userId].status === "BUSY" && recipient.status === "BUSY") {
            // Simulate interaction with Language Model API . Didn't get time to integrate real one 
            sendResponseToSender(socket.id, "User is busy. Ask later.");
          } else {
            io.to(recipient.socketId).emit("messageReceived", { senderId: userId, message });
          }
        }
    });
});

export { app, io, server };