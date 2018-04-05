const express = require('express');
//import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
const bodyParser = require('body-parser');
const schema = require('./data/schema');
const compression = require('compression');

const { ApolloEngine } = require('apollo-engine');
const port = 3000;
const API_KEY = 'service:karlcode-4325:Z579YY4V4EZB-E3dv546Mg'
const engine = new ApolloEngine({
    apiKey: API_KEY,
    stores: [
      {
        name: 'inMemEmbeddedCache',
        inMemory: {
          cacheSize: 20971520 // 20 MB
        }
      }
    ],
    queryCache: {
      publicFullQueryStore: 'inMemEmbeddedCache'
    }
});
const app = express();

app.use(compression()); //tracing
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, tracing:true, cacheControl:true }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.get('/api', (req,res) => {
  res.send(schema)
})

engine.listen({
  port: port,
  graphqlPaths: ['/graphql'],
  expressApp: app,
  launcherOptions: {
    startupTimeout: 3000,
  },
}, () => {
  console.log(`GraphiQL is now running on http://localhost:${port}/graphiql`);
});