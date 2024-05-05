import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const checkToken = (req, res, next) => {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) return res.status(403).send('auth header doesnt exist');
   
    const token = authHeaders.split(' ')[1];
    if (!token) return res.status(403).send('Bearer token not found');
   
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
    } catch (err) {
      return res.status(401).send('invalid Token');
    }
    return next();
  };

  export default checkToken