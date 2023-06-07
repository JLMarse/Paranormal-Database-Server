const router = require("express").Router()
const jwt = require('jsonwebtoken')
const User = require("../models/User.model")
const uploaderMiddleware = require("../middlewares/uploader.middleware")
const { verifyToken } = require("../middlewares/verifyToken.middleware")

router.get("/:id", (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .populate('favoriteEvents') // Populo los eventos favoritos
        .then(user => res.json(user))
        .catch(err => next(err))
})

router.put("/:id/edit", (req, res, next) => {
    const { id } = req.params
    const { name, lastName, avatar, email } = req.body

    User
        .findByIdAndUpdate(id, { name, lastName, avatar, email })
        .then(user => {
            const authToken = user.signToken()
            res.status(200).json({ authToken })
        })
        .catch(err => next(err))
})

router.delete("/:id/delete", (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(user => res.json("User deleted successfully"))
        .catch(err => next(err))
})

router.put("/:id/favoriteEvents/add", (req, res, next) => {
    const { id } = req.params;
    const { eventId } = req.body;

    User.findByIdAndUpdate(
        id,
        { $push: { favoriteEvents: eventId } },
        { new: true }
    )
        .then((user) => {
            res.json(user);
        })
        .catch((err) => next(err));
});


router.put("/:id/favoriteEvents/remove", (req, res, next) => {
    const { id } = req.params;
    const { eventId } = req.body;

    User.findByIdAndUpdate(
        id,
        { $pull: { favoriteEvents: eventId } },
        { new: true }
    )
        .then((user) => {
            res.json(user);
        })
        .catch((err) => next(err));
});

module.exports = router
