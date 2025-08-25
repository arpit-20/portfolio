import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog post'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt for this blog post'],
    maxlength: [300, 'Excerpt cannot be more than 300 characters']
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this blog post'],
    unique: true,
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date for this blog post'],
    default: Date.now
  },
  featured: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Check if the model exists before creating it
// This prevents the "Cannot overwrite model once compiled" error
// Specify the collection name as 'portfolio-blogs'
export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema, 'portfolio-blogs');
