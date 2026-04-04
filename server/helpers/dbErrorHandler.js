'use strict'

/**
 * Get unique error field name
 */
const getUniqueErrorMessage = (err) => {
    try {
	    const fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))
	    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
    } catch (ex) {
	    console.error('Error parsing unique field name:', ex)
	    return 'Unique field already exists'
    }
}

/**
 * Get the error message from error object
 */
const getErrorMessage = (err) => {
    let message = ''

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Something went wrong'
        }
    } else if(err.errors) {
	    message = Object.values(err.errors).map(e => e.message).join('. ')
    }

    return message
}

export default {getErrorMessage}
