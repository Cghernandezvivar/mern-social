import errorHandler from './dbErrorHandler'
const handleControllerError = (res, err, statusCode = 400, fallbackMessage = null) => {
	return res.status(statusCode).json({
		error: fallbackMessage || errorHandler.getErrorMessage(err)
	})
}
export default handleControllerError
