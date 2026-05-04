import User from '../models/user.model'

const sanitizeUser = (user) => {
    user.hashed_password = undefined
    user.salt = undefined
    return user
}

const follow = async (userId, followId) => {
    await User.findByIdAndUpdate(userId, { $push: { following: followId } })
    
    let result = await User.findByIdAndUpdate(
        followId,
        { $push: { followers: userId } },
        { new: true }
        )
        
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec()

        return sanitizeUser(result)
}

const unfollow = async (userId, unfollowId) => {
    await User.findByIdAndUpdate(userId, { $push: { following: unfollowId } })

    let result = await User.findByIdAndUpdate(
        unfollowId,
        { $push: { followers: userId } },
        { new: true }
        )

        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec()

        return sanitizeUser(result)
}

export default {
    follow,
    unfollow
}
