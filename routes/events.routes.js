const router = require("express").Router();

const Event = require('./../models/Event.model')

const User = require('./../models/User.model')

const { isAuthenticated } = require("../middlewares/verifyToken.middleware.js")



router.get("/paranormalevents", (req, res, next) => {

  Event
    .find()
    .select({ owner: 1, title: 1, reportType: 1, locationDetails: 1, cover: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))

})


router.get("/paranormalevents/search", (req, res, next) => {
  const { q } = req.query;

  Event
    .find({ $text: { $search: q } })
    .then(events => res.json(events))
    .catch(err => next(err));
})

router.get("/paranormalevents/:event_id", (req, res, next) => {

  const { event_id } = req.params

  Event
    .findById(event_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/paranormalEvents/saveEvent", isAuthenticated, (req, res, next) => {

  const { reportType, title, locationDetails, date, furtherDetails, cover } = req.body

  const { _id: owner } = req.payload

  Event
    .create({ reportType, title, locationDetails, date, furtherDetails, cover, owner })
    .then(response => res.json(response))
    .catch(err => next(err))


})


router.delete('/paranormalEvents/:event_id/delete', (req, res, next) => {

  const { event_id } = req.params
  console.log(event_id)

  Event
    .findByIdAndDelete(event_id)
    .then(event => res.json(event))
    .catch(err => next(err))

})

router.put('/paranormalEvents/:event_id/edit', (req, res, next) => {

  const { event_id } = req.params

  const {
    title,
    reportType,
    locationDetails,
    date,
    furtherDetails,
    cover,
  } = req.body

  const event = {
    title,
    reportType,
    locationDetails,
    date,
    furtherDetails,
    cover,
  }

  Event
    .findByIdAndUpdate(event_id, event) //ojo por si tengo que poner el new o algo más, no estoy seguro ahora
    .then(event => res.json(event))
    .catch(err => next(err))

})


router.put("/users/:id/favoriteEvents/add", (req, res, next) => {
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

/* router.get("/paranormalevents/random", (req, res, next) => {
  Event.aggregate([{ $sample: { size: 1 } }])
    .then(event => res.json(event[0]))
    .catch(err => next(err));
});
 */






module.exports = router;




