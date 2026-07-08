const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const connectDB = require("../database/db");

const PORT = process.env.PORT;

connectDB();

async function startServer(){
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    const {url} = await startStandaloneServer(server, {
        listen: {port: PORT}
    })

    console.log(`server running on ${url}`)
}

startServer();