import { 
  GraphQLNonNull,
  GraphQLID
} from 'graphql';
import { userType } from '../../types';
import UserModel from '../../../models/user';

export default {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    const removedUser = UserModel.findByIdAndRemove(params.id);
    if (!removedUser) {
      throw new Error('Error removing user');
    }

    return removedUser;
  }
};