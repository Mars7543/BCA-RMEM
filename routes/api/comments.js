const Comment = require('../../models/Comment')
const Post = require('../../models/Post')
const router = require('express').Router()
const auth = require('../../middleware/auth')

// @route   POST /api/comments/:id
// @desc    Create New Comment Given Post ID
// @access  Protected
router.post('/:post_id', auth, async (req, res) => {
    const post = await Post.findById(req.params.post_id)
    if (!post) return res.status(404).json({ msg: 'Post not found' })

    try {
        const comment = await Comment.create({ comment: req.body.comment, user_id: req.user.id })
        post.comments.push(comment._id)
        await post.save()
        return res.json(comment)
    } catch(err) {
        console.log(err)
        res.status(400).json({ msg: 'Error creating comment' })
    }
})

// @route   DELETE /api/comments/:post_id/:comment_id
// @desc    Delete Comment Given Post ID & Comment ID
// @access  Protected
router.delete('/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const { post_id, comment_id } = req.params

        const comment = await Comment.findOne({ _id: comment_id, user_id: req.user.id, })
        const post = await Post.findById(post_id)

        if (!comment || !post) return res.status(404).json()

        post.comments = post.comments.filter(c => !c._id.equals(comment._id))

        await post.save()
        await comment.remove()

        res.json({ msg: 'Deleted Comment' })
    } catch(err) {
        console.log(err)
        res.status(500).send({ msg: 'Error deleting comment' })
    }
})

module.exports = router