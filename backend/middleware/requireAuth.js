import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    console.log('Authorization header missing');
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];
  console.log('Authorization Header:', authorization);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log('Decoded Token:', decodedToken);
    const { _id } = decodedToken;

    const user = await User.findOne({ _id }).select('_id');
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'User not found' });
    }

    console.log('Authenticated User:', user);
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in requireAuth middleware:', error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

export default requireAuth;
