import mongoose from 'mongoose';
 
const CommentSchema = new mongoose.Schema({
   email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // Reference to the blog post this comment belongs to
  },
  text: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
