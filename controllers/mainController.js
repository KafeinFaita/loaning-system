const User = require('../models/User')

module.exports.users_get = async (req, res) => {
    try {
        const users = await User.find()
        const names = users.map(user => user.username)
       
        res.render('users', { names, test: "asd" })
    } catch (error) {
        console.log(error)
    }
}