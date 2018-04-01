import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from './mocks';
import resolvers from './resolvers';

const typeDefs = `
type Query {
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  getFortuneCookie: String @cacheControl (maxAge: 5)
  findStaff: [Staff]
  getActor : [Actor]
  actor(first_name: String, last_name: String): Actor
  getTickers: [Ticker]
  getTicker(id: String!): Ticker
}
type Mutation {
  addStaff(first_name: String, last_name: String, staff_id: Int, address_id: Int, store_id: Int, username: String) : Staff 
}
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}
type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}
type Staff {
  first_name: String
  last_name: String
  address_id: Int
}
type Actor {
  actor_id: Int
  first_name: String
  last_name: String
}
type Ticker {
  id: String
  name: String
  symbol: String
  rank: Int
  price_usd: Float
  price_btc: Float
  market_cap_usd: Float
  available_supply: Float
  total_supply: Float
  percent_change_1h: Float
  percent_change_24h: Float
  percent_change_7d: Float
  last_updated: Int
}
`;                                      //each key can either be a primitive type (int, str) or an object/list ([Author], Friend)

const schema = makeExecutableSchema({ typeDefs, resolvers });

//addMockFunctionsToSchema({ schema, mocks });

export default schema;
