const Post = require('../../models/Post')
const router = require('express').Router()
const auth = require('../../middleware/auth')

// router.get('/delete', async (req, res) => {
//     const d = await Post.deleteMany({ title: "Title" })
//     res.json(d)
// })

// @route   GET /api/posts
// @desc    Get All Posts
// @access  Public
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('user').exec()
    res.json(posts)
})

// @route   POST /api/posts
// @desc    Create New Post
// @access  Protected
router.post('/', auth, async (req, res) => {
    const { title, body, image } = req.body
    try {
        const post = await Post.create({
            title,
            body,
            image,
            user: req.user.id
        })

        return res.json(post)
    } catch(err) {
        console.log(err)
        res.status(400).json({ msg: 'Error creating post' })
    }
})


// @route   GET /api/posts/:id
// @desc    Get Post by ID
// @access  Public
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user').exec()

    if (!post) return res.json({ msg: 'Post not found' })
    res.json(post)
})

// @route   PUT /api/posts/:id
// @desc    Update Post by ID
// @access  Protected
router.put('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'image', 'body']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error : "Invalid Updates" })

    try {
        const post = await Post.findOne({ _id: req.params.id, user: req.user.id })
        if (!post) return res.status(404).send()

        updates.forEach((update) => post[update] = req.body[update])

        await post.save()

        res.send(post)
    } catch (err) {
        res.status(500).send(err)
    }
})

// @route   DELETE /api/posts/:id
// @desc    Delete Post by ID
// @access  Protected
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, user: req.user.id })
        if (!post) return res.status(404).json()
        
        await post.remove()
        res.json({ msg: 'Deleted Post' })
    } catch(err) {
        console.log(err)
        res.status(500).send({ msg: 'Error deleting post' })
    }
})

module.exports = router