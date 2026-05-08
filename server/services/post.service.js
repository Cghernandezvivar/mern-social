import Post from '../models/post.model'
import uploadService from './upload.service'
import fs from 'fs'

const createPost = async (req) => {
    try {
        const { fields, files } = await uploadService.parseMultipartForm(
        req,
        'Image could not be uploaded'
    )
        let post = new Post(fields)
        post.postedBy = req.profile

        if (files.photo) {
            post.photo.data = await fs.promises.readFile(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        let result = await post.save()
        return result
    } catch (err) {
        if (err.status) throw err

        throw {
            error: err,
            status: 400
        }
    }
}

const removePost = async (post) => {
    try {
        let deletedPost = await post.remove()
        return deletedPost
    } catch (err) {
        throw {
            error: err,
            status: 400
        }
    }
}
export default {
    createPost,
    removePost
}
