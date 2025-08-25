import jwt from 'jsonwebtoken';

// Secret key for JWT verification - in production, use an environment variable
const JWT_SECRET = 'your-secret-key-should-be-in-env-file';

// Middleware to verify JWT token
export function verifyToken(token) {
  if (!token) {
    return null;
  }
  
  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Check if user is authenticated
export function isAuthenticated(req) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  // Extract the token
  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);
  
  return !!user;
}

// Check if user is admin
export function isAdmin(req) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  // Extract the token
  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);
  
  return user && user.role === 'admin';
}

// Helper function to get user from token
export function getUserFromToken(token) {
  return verifyToken(token);
}
