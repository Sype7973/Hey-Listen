const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require('cors');

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'], // Specify the HTTP methods you want to allow
  credentials: true, // Allow cookies and other credentials to be sent
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

const httpServer = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

io.on("connection", (socket) => {
  // Listen for the 'chat message' event from clients
  socket.on("chat message", async (data) => {
    console.log("data");
    console.log(data);
    // const { content, sender, receiver } = data;

    // try {
    //   // Call the createMessage mutation resolver to handle the new message
    //   const newMessage = await resolvers.Mutation.createMessage(null, {
    //     content,
    //     sender,
    //     receiver,
    //   });

    //   console.log(newMessage);

    //   // Emit the new message back to all connected clients
    //   io.emit("chat message", { content, sender, receiver }, newMessage._id);
    // } catch (error) {
    //   console.error("Error handling chat message:", error);
    // }
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
