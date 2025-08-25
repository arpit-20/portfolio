import dbConnect from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';

// This is a simple mock authentication
// In a real application, you would:
// 1. Connect to your database
// 2. Check credentials against stored user data
// 3. Use proper password hashing

// Secret key for JWT signing - in production, use an environment variable
const JWT_SECRET = 'your-secret-key-should-be-in-env-file';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // For demo purposes only - REPLACE WITH REAL AUTHENTICATION
    // In a real app, you'd check against your database
    if (
      (username === 'arpitghai20@gmail.com' && password === 'MYlaptop123@')
    ) {
      // Create user object
      const user = {
        id: '1',
        username: username,
        name: 'Arpit',
        role: 'admin' // This will be used to authorize blog editing/deletion
      };
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          username: user.username,
          role: user.role 
        }, 
        JWT_SECRET, 
        { expiresIn: '7d' } // Token expires in 7 days
      );
      
      // Success - return user data with token
      return res.status(200).json({
        ...user,
        token
      });
    }

    // Authentication failed
    return res.status(401).json({ message: 'Invalid username or password' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}