const router = require("express").Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./../models/User.model')
const { isAuthenticated } = require("../middlewares/verifyToken.middleware")



router.post('/signup', (req, res, next) => {

    const { name, lastName, avatar, email, password } = req.body


    User
        .create({ name, lastName, avatar, email, password })
        .then((createdUser) => {
            const { name, lastName, avatar, email, _id } = createdUser
            const user = { name, lastName, avatar, email, _id }
            res.status(201).json({ user })
        })
        .catch(err => {
            next(err)
        })
})



router.post('/login', (req, res, next) => {

    //console.log('secretoo', process.env.TOKEN_SECRET)

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return
            }

            if (foundUser.validatePassword(password)) {

                const authToken = foundUser.signToken()

                res.json({ authToken: authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }

        })
        .catch(err => next(err));
})



router.get('/verify', isAuthenticated, (req, res, next) => {

    console.log('EL USUARIO TIENE UN TOKEN CORRECTO Y SUS DATOS SON', req.payload)
    res.json({ user: req.payload })

})


module.exports = router;