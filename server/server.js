const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const { Server } = require("socket.io");
const cors = require("cors");
const { User, Conversation } = require("./models");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"], // Specify the HTTP methods you want to allow
  credentials: true, // Allow cookies and other credentials to be sent
};

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const http = require("http");
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("CONNECTED");

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  socket.on("join room", (roomId) => {
    socket.join(roomId);
    console.log(`Client ${socket.id} joined room ${roomId}`);
  });

  socket.on("leave room", (roomId) => {
    socket.leave(roomId);
    console.log(`Client ${socket.id} left room ${roomId}`);
  });

  socket.on("load previous messages", async (conversationId) => {
    try {
      let { sender, receiver } = conversationId;

      const previousMessages = await resolvers.Query.getConversation(null, {
        conversationId,
      });

      socket.emit("previous messages", previousMessages);
    } catch (error) {
      console.error("Error loading previous messages:", error);
    }
  });

  socket.on("chat message", async ({ roomId, message }) => {
    const { content, sender, receiver } = message;

    // Check for required fields
    if (!content || !sender || !receiver) {
      console.error("Missing required fields: content, sender, or receiver");
      return;
    }

    try {
      // Call the createMessage mutation resolver to handle the new message
      const newMessage = await resolvers.Mutation.createMessage(null, {
        content,
        sender,
        receiver,
      });

      // Emit the new message to the specific room
      io.to(roomId).emit("chat message", {
        content,
        sender,
        receiver,
        id: newMessage._id,
      });
    } catch (error) {
      console.error(`Error handling chat message for room ${roomId}:`, error);
    }
  });
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();
