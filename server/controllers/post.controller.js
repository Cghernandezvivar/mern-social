import Post from '../models/post.model'
import postService from '../services/post.service'
import handlerControllerError from '../helpers/controllerErrorHandler'

const create = async (req, res) => {
    try {
        const result = await postService.createPost(req)
        res.json(result)
    } catch ({ error, status, message }) {
        return handlerControllerError(res, error, status, message)
    }
}

const postByID = async (req, res, next, id) => {
  try{
    let post = await Post.findById(id).populate('postedBy', '_id name').exec()
    if (!post)
	  return handlerControllerError(res, null, 400, "Post not found")
    req.post = post
    next()
  }catch(err){
	  return handlerControllerError(res, err, 400, "Could not retrieve use post")
  }
}

const listByUser = async (req, res) => {
  try{
    let posts = await Post.find({postedBy: req.profile._id})
                          .populate('comments.postedBy', '_id name')
                          .populate('postedBy', '_id name')
                          .sort('-created')
                          .exec()
    res.json(posts)
  }catch(err){
	  return handlerControllerError(res, err, 400)
  }
}

const listNewsFeed = async (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  try{
    let posts = await Post.find({postedBy: { $in : req.profile.following } })
                          .populate('comments.postedBy', '_id name')
                          .populate('postedBy', '_id name')
                          .sort('-created')
                          .exec()
    res.json(posts)
  }catch(err){
	  return handlerControllerError(res, err, 400)
  }
}

const remove = async (req, res) => {
    try {
        const deletedPost = await postService.removePost(req.post)
        res.json(deletedPost)
    } catch ({ error, status, message }) {
        return handlerControllerError(res, error, status, message)
    }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType)
    return res.send(req.post.photo.data)
}

const like = async (req, res) => {
  try{
    let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {likes: req.body.userId}}, {new: true})
    res.json(result)
  }catch(err){
	  return handlerControllerError(res, err, 400)
  }
}

const unlike = async (req, res) => {
  try{
    let result = await Post.findByIdAndUpdate(req.body.postId, {$pull: {likes: req.body.userId}}, {new: true})
    res.json(result)
  }catch(err){
	  return handlerControllerError(res, err, 400)
  }
}

const comment = async (req, res) => {
  let comment = req.body.comment
  comment.postedBy = req.body.userId
  try{
    let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}}, {new: true})
                            .populate('comments.postedBy', '_id name')
                            .populate('postedBy', '_id name')
                            .exec()
    res.json(result)
  }catch(err){
	  return handlerControllerError(res, err, 400)
  }
}
const uncomment = async (req, res) => {
  let comment = req.body.comment
  try{
    let result = await Post.findByIdAndUpdate(req.body.postId, {$pull: {comments: {_id: comment._id}}}, {new: true})
                          .populate('comments.postedBy', '_id name')
                          .populate('postedBy', '_id name')
                          .exec()
    res.json(result)
  }catch(err){
	  return handlerControllerError(res, err, 400)
  }
}

const isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
  if(!isPoster){
	  return handlerControllerError(res, null, 403, "User is not authorized")
  }
  next()
}

export default {
  listByUser,
  listNewsFeed,
  create,
  postByID,
  remove,
  photo,
  like,
  unlike,
  comment,
  uncomment,
  isPoster
}
