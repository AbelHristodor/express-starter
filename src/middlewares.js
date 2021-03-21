/* Custom middlewares */

const notFound = (req, res, next) => {
    // Create error and add some info to it
    let error = new Error('Route not found');
    error.statusCode = 404;

    // Sending error to the errorHandler middleware
    next(error);
};

const errorHandler = (error, req, res, next) => {
    // Generic Error handler

    // If status code of error not found then set it to a generic 500 internal server error
    if (!error.statusCode) error.statusCode = 500;

    // Send error
    res.status(error.statusCode).send({
        error: {
            status: error.statusCode,
            message: error.message || 'Internal Server Error',
            stack: error.stack
        }
    })
};

module.exports = {
    errorHandler,
    notFound
}
