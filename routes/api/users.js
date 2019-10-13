const router    = require('express').Router()
const User      = require('../../models/User')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

// @route   POST /api/users
// @desc    Register New User
// @access  Public

router.post('/', async (req, res) => {
    const { name, username, email, password } = req.body

    // Simply validation
    if (!name || !username || !email || !password)
        return res.status(400).json({ msg: 'Please enter all fields' })
    
    // Check for existing user
    const user1 = await User.findOne({ email })
    const user2 = await User.findOne({ username })

    if (user1) return res.status(400).json({ msg: 'User with given email already exists' })
    if (user2) return res.status(400).json({ msg: 'Username is taken'})

    // Create User
    const newUser = new User({ name, username, email, password })

    try {
        // Create password hash
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        newUser.password = hash
        let user = await newUser.save()

        const token = await jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: 86400 })

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
        console.log(err)
        res.status(500).send({ msg: 'Error Creating User' })
    }
})

module.exports = router