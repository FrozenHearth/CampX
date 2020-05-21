const router = require('express').Router();

const Campground = require(`../../models/campground`);
const checkAuth = require('../../middleware/check-auth');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

// Get all campgrounds

router.get('/', (req, res) => {
  Campground.find()
    .then(campgrounds => res.status(200).json({ campgroundList: campgrounds }))
    .catch(err => {
      res
        .status(400)
        .json({ message: `Could not retrieve all campgrounds, ${err}` });
    });
});

// Get a single campground

router.get('/:id', (req, res) => {
  Campground.findById(req.params.id)
    .then(campground => res.status(200).json({ singleCampground: campground }))
    .catch(err => {
      res.status(404).json({ message: `Campground not found, ${err}` });
    });
});

// Add a new campground

router.post('/', checkAuth, (req, res, next) => {
  const { title, description, cost, image } = req.body;
  const campgroundToPost = new Campground({
    title,
    description,
    cost,
    image,
    _author: {
      id: req.userData.userId,
      firstName: req.userData.firstName
    }
  });
  campgroundToPost
    .save()
    .then(result => res.status(200).json({ campground: result }))
    .catch(err => res.status(400).send(`Failed to add campground, ${err}`));
});

router.put('/:id', (req, res) => {
  Campground.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(campground => res.json({ editedCampground: campground }))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  Campground.findByIdAndRemove({ _id: req.params.id })
    .then(campground => {
      res.status(200).json({ deletedCampground: campground });
    })
    .catch(err => res.status(400).send(`Failed to delete campground, ${err}`));
});

module.exports = router;
