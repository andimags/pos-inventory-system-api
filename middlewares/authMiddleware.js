const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;

        if(!authorization){
            return res.json({
                status: 0,
                message: "Token not found."
            })
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.PRIVATE_KEY);
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