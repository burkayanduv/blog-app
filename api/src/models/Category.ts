import mongoose from 'mongoose';

interface CategoryInterface {
  name: string;
}

const CategorySchema = new mongoose.Schema<CategoryInterface>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Category', CategorySchema);
