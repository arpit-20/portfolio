import dbConnect from '../../../utils/dbConnect';
import Blog from '../../../models/Blog';
import { isAuthenticated, isAdmin } from '../../../utils/authMiddleware';

export default async function handler(req, res) {
  const { 
    method,
    query: { slug },
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const blog = await Blog.findOne({ slug });
        
        if (!blog) {
          return res.status(404).json({ success: false, error: 'Blog post not found' });
        }
        
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      
    case 'PUT':
      // Check if user is authenticated
      if (!isAuthenticated(req)) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
      }
      
      // Only admin users can edit blogs
      if (!isAdmin(req)) {
        return res.status(403).json({ success: false, error: 'Not authorized to edit blogs' });
      }
      
      try {
        const blog = await Blog.findOneAndUpdate(
          { slug }, 
          req.body, 
          { 
            new: true, 
            runValidators: true 
          }
        );
        
        if (!blog) {
          return res.status(404).json({ success: false, error: 'Blog post not found' });
        }
        
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      
    case 'DELETE':
      // Check if user is authenticated
      if (!isAuthenticated(req)) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
      }
      
      // Only admin users can delete blogs
      if (!isAdmin(req)) {
        return res.status(403).json({ success: false, error: 'Not authorized to delete blogs' });
      }
      
      try {
        const deletedBlog = await Blog.findOneAndDelete({ slug });
        
        if (!deletedBlog) {
          return res.status(404).json({ success: false, error: 'Blog post not found' });
        }
        
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}