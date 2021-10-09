import mongoose from 'mongoose';

interface UserInterface {
  username: string;
  email: string;
  password: string;
  profilePic: string;
}

export interface UserDocumentInterface
  extends UserInterface,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}

const UserSchema = new mongoose.Schema<UserDocumentInterface>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
