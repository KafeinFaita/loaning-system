const User = require('../models/User')
const bcrypt = require('bcrypt')

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