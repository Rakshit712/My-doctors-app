function errorWrapper(fn) {
    return async function (req, res) {
        try {
            await fn(req, res)

        } catch (error) {

            const statusCode = error.statusCode || 500;
            const message = error.message;
            const status = error.status || 'Something went wrong';

            return res.status(statusCode).json({
                status,
                message,

            })

        }
    }
}
module.exports = errorWrapper;