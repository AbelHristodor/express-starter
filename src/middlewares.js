const notFound = (req, res, next) => {
    res.status(404);
    const error = new Error('404 - Not Found');
    next(error);
}
/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
    /* eslint-enable no-unused-vars */
    const status = res.status !== 200 ? res.statusCode : 500;
    res.status(status);

    res.json({
        message: err.message,
    });
}

module.exports = {
    notFound,
    errorHandler
};