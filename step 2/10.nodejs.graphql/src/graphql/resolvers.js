

const products = require("../data/products");

const resolvers = {
    Query: {
        products:()=> products
    }
}

module.exports = resolvers;