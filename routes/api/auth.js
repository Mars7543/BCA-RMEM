const User      = require('../../models/User')
const router    = require('express').Router()
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

// @route   POST /api/auth
// @desc    Authenticate User
// @access  Public

router.post('/', async (req, res) => {
    const { username, password } = req.body

    // Simple validation
    if (!username || !password)
        return res.status(400).json({ msg: 'Please enter all fields' })
    
    // Check for existing user
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ msg: 'User does not exist' })

    try {
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) return res.status(400).json({ msg: 'Invalid Password' })

        const token = await jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: 21600 })
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username
            }
        })

    } catch(err) {
        res.status(500).json({ msg: 'Error Authenticating User'})
    }
})

module.exports = router