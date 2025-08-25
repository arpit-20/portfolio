import dbConnect from '../../../utils/dbConnect';
import Blog from '../../../models/Blog';
import { isAuthenticated, isAdmin } from '../../../utils/authMiddleware';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const blogs = await Blog.find({}).sort({ date: -1 }); // Sort by date descending
        res.status(200).json({ success: true, data: blogs });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      
    case 'POST':
      // Check if user is authenticated
      if (!isAuthenticated(req)) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
      }
      
      // Only admin users can create blogs
      if (!isAdmin(req)) {
        return res.status(403).json({ success: false, error: 'Not authorized to create blogs' });
      }
      
      try {
        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}