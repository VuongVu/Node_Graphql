import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';

import schema from '../graphql';

const MONGO_URL = 'mongodb://vuongvu:123456@ds153732.mlab.com:53732/graphql';

// Connect to mongodb
mongoose.connect(MONGO_URL, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', () => { 
  console.log('Failed to connect to database.');
});
db.once('open', () => {
  console.log('Connect to database');
});

// Init Express app
const app = express();

// Middlewares
app.use(logger(app.get('env') === 'development' ? 'dev' : 'common'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// First render
app.get('/', (req, res) => {
  res.send('Hello Graphql');
});

// Graphql API endpoint
app.use('/graphql', graphqlHTTP({
  schema,
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