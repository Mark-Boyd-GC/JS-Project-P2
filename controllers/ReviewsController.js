const Review = require('../models/Review');
const User = require('../models/User');

const getUser = async (req) => {
  const { user: email } = req.session.passport;
  return await User.findOne({ email: email });
};

exports.recommendations = async (req, res) => {
  try {
    const recommendations = await Review.recommendations();
    res.status(200).json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'failed',
      message: `Couldn't get the review types.`,
      error,
    });
  }
};

exports.index = async (req, res) => {
  try {
    const user = await getUser(req);

    const reviews = await Review.find({ user: user._id })
      .populate('user')
      .sort({ updatedAt: 'desc' });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'failed',
      message: `There was an error in retrieving the reviews.`,
      error,
    });
  }
};

exports.show = async (req, res) => {
  try {
    const user = await getUser(req);

    const review = await Review.findOne({
      user: user._id,
      _id: req.params.id,
    }).populate('user');

    if (!review) throw new Error('Review could not be found');

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'failed',
      message: `There was an error in retrieving the review.`,
      error,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const user = await getUser(req);

    const review = await Review.create({ user: user._id, ...req.body });

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'failed',
      message: `There was an error in creating the review.`,
      error,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await getUser(req);
    let review = await Review.findOne({ user: user._id, _id: req.body.id });

    if (!review) throw new Error('Review could not be found');

    const attributes = { user: user._id, ...req.body };
    await Review.validate(attributes);

    await Review.updateOne(
      { _id: req.body.id, user: user._id },
      { ...req.body }
    );

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'failed',
      message: `There was an error in updating the review.`,
      error,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await getUser(req);
    let review = await Review.findOne({ user: user._id, _id: req.body.id });
    if (!review) throw new Error('Review could not be found');

    await Review.deleteOne({ _id: req.body.id, user: user._id });

    res.status(200).json({ message: 'Review was deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'failed',
      message: `There was an error in deleting the review.`,
      error,
    });
  }
};
