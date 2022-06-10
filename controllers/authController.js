const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//create token
const maxAge = 3 * 24 * 60 * 60
const createToken = id => {
    return jwt.sign({ id }, 'loaning secret', {
        expiresIn: maxAge
    })
}

module.exports.signup_post = async (req, res) => {
    const hashedPass = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({ username: req.body.username, password: hashedPass })

    try {
        await newUser.save()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

module.exports.login_post = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })

    if (user) {
        const auth = await bcrypt.compare(req.body.password, user.password)
        console.log(auth)

        if (auth) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            return res.json({ user: user._id })
        } else {
            return res.json('Password is incorrect!')
        }
    }
    
    return res.json("User doesn't exist!")

}