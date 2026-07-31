import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a book title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please provide an author name'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['Want to Read', 'Reading', 'Completed'],
      default: 'Want to Read',
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

// Compound indexes for query optimization
BookSchema.index({ userId: 1, status: 1 });
BookSchema.index({ userId: 1, updatedAt: -1 });

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
