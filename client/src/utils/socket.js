import io from "socket.io-client";

// Create a variable to hold the socket instance
let socketInstance = null;

// Function to initialize and get the socket instance
function getSocketInstance() {
    if (!socketInstance) {
        // Initialize the socket connection if it hasn't been initialized yet
        socketInstance = io("http://localhost:3001", {
            auth: { serverOffset: 0 },
        });
    }
    return socketInstance;
}

// Export the function to get the socket instance
export default getSocketInstance;