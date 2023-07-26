const express = require('express');

////// Brining in the ApolloServer///// added
const { ApolloServer } = require("apollo-server-express")

const path = require('path');

//////////// added 
const { typeDefs, resolvers } = require("./schemas")

const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//////////////added
const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..client/build/index.html"));
});

// Creating a new instance of an Apollo server////////added
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server up and running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

/////////////// added
startApolloServer()


// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
