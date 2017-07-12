import userMutaion from './user';
import postMutation from './post';

export default {
  ...userMutaion,
  ...postMutation
};