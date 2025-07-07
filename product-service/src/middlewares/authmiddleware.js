const axios = require('axios');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Call user-service to verify token
    const response = await axios.post('http://localhost:3000/api/users/verify-token', {
      token
    });

    req.userId = response.data.userId;
    req.userEmail = response.data.email;
    req.userRole = response.data.role;
    req.userName = response.data.name;
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

module.exports = { authMiddleware, adminOnly };