const { validationResult } = require('express-validator');

function validationMiddleware(req, res, next) {
    try {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            const formattedErrors = {};

            result.array().forEach(err => {
                if (!formattedErrors[err.path]) {
                    formattedErrors[err.path] = [];
                }
                formattedErrors[err.path].push(err.msg);
            });

            const error = new Error('Validation failed');
            error.status = 400;
            error.details = formattedErrors;
            throw error;
        }

        next();
    } catch (err) {
        res.status(err.status || 500).json({
            status: 0,
            message: `Something went wrong: ${err.message}`,
            errors: err.details || null
        });
    }
}

module.exports = validationMiddleware;
