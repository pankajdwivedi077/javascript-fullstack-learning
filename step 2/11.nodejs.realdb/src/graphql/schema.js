// this file will tell what will be structure of data

const { gql } = require("graphql-tag");

// String
//Int
//Float
//Boolean
//Id -> an unique identifier

const typeDefs = gql`

type Product {
  id: ID!
  title: String!
  category: String!
  price: Float!
  inStock: Boolean!
}

type Query {
 products: [Product!]!
 product(id: ID!): Product
}

type Mutation{
 createProduct(
  title: String!
  category: String!
  price: Float!
  inStock: Boolean!
 ) : Product

deleteProduct(id: ID!): Boolean

updateProduct(
  id: ID!
  title: String
  category: String
  price: Float
  inStock: Boolean
): Product



}

`;

module.exports = typeDefs;