const jwt = require('jsonwebtoken');
const cookie = require('cookie');

function authMiddleware(req, res, next) {
    try {
        const cookies = cookie.parse(req.headers.cookie || ''); 
        const token = cookies.token;


        if(!token){
            return res.json({
                status: 0,
                message: "Token not found."
            })
        }

        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.json({
            status: 0,
            message: `Something went wrong: ${err.message}`
        })
    }
}

module.exports = authMiddleware;