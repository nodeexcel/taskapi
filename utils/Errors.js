module.exports = function errorHandler(error, req, res, next) {
    if (error.status) {
        res.status(error.status).json({ error: error });
    } else {
        console.log(error)
        res.status(500).json({ error })
    }
}