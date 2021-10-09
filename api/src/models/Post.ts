import mongoose from 'mongoose';

interface PostInterface {
  title: string;
  desc: string;
  photo: string;
  username: string;
  categories?: string[];
}

const PostSchema = new mongoose.Schema<PostInterface>(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
