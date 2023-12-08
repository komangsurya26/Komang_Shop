const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

async function verifyAccesToken (req,res,next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
              error: "Token Not Found!!",
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // di bawa ke api lainnya
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

async function verifyAccesAdmin (req,res,next) {
    try {
        const admin = req.user.isAdmin
        if (admin === false) {
          return res.status(403).json({
            error: "You are not admin!!",
          });
        }
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports = { verifyAccesToken, verifyAccesAdmin };