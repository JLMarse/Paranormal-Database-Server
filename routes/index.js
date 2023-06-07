const router = require("express").Router()

router.use("/events", require('./events.routes'))
router.use("/auth", require('./auth.routes'))
router.use("/upload", require('./upload.routes'))
router.use("/users", require('./users.routes'))

module.exports = router

