export default {
  development: {
    database: 'graphql',
    host: 'localhost',
    port: '27017',
    url: 'mongodb://localhost:27017/graphql'
  },
  production: {
    username: 'vuongvu',
    password: '123456',
    database: 'graphql',
    host: 'ds153732.mlab.com',
    port: '53732',
    url: 'mongodb://vuongvu:123456@ds153732.mlab.com:53732/graphql'
  }
};