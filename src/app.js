import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoConfig from './config/mongodb';

// Init Express app
const app = express();

const MONGO_URL = app.get('env') === 'development' ? mongoConfig.development.url : mongoConfig.production.url;

// Connect to mongodb
mongoose.connect(MONGO_URL, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', () => { 
  console.log('Failed to connect to database.');
});
db.once('open', () => {
  console.log(`Connect to database at ${MONGO_URL}`);
});

// Middlewares
app.use(helmet());
app.use(logger(app.get('env') === 'development' ? 'dev' : 'common'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const schema = buildSchema(`
  type Query {
    postTitle: String,
    blogTitle: String
  }
`);

const root = {
  postTitle: () => {
    return 'Build a Simple GraphQL Server With Express and NodeJS';
  },
  blogTitle: () => {
    return 'scotch.io';
  }
};

// Graphql API endpoint
app.use('/', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
  pretty: true
}));

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;

  next(err);
});

// Error handler function
app.use((err, req, res) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status;

  // Response to the client
  res.status(status).json({
    error: {
      message: error.message
    }
  });
});

// Listen server
app.listen(3000, () => {
  console.log('Graphql API running at port 3000');
});