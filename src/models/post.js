import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  title: String,
  body: String
});

export default model('post', postSchema);