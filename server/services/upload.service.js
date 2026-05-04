import formidable from 'formidable'

const parseMultipartForm = (req, errorMessage) =>
    new Promise((resolve, reject) => {
        let form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject({
                    error: err,
                    status: 400,
                    message: errorMessage
                })
            }
            resolve({ fields, files})
        })
    })
export default {
    parseMultipartForm
}
