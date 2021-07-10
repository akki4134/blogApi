const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel')
const { registerValidation, loginValidation } = require('../Middleware/userValidation')


exports.register = async (req, res) => {


    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const usernameExist = await User.findOne({ username: req.body.username })
    if (usernameExist) return res.status(400).send('Username already exists')

    const phonenumberExist = await User.findOne({ phonenumber: req.body.phonenumber })
    if (phonenumberExist) return res.status(400).send('Phone Number already exists')

    const salt = await bcrypt.genSalt(10)

    const hashpassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        password: hashpassword
    });

    try {
        await user.save();
        res.status(200).send(user)

    } catch (error) {
        res.status(400).send(error)
    }
};

exports.login = async (req, res) => {

    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).send('Username not found')

    const validate = await bcrypt.compare(req.body.password, user.password)
    if (!validate) return res.status(400).send('Invalid password')

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.header('auth-token', token).send(token)

    res.status(200).send('user logged in sucessfully')

}