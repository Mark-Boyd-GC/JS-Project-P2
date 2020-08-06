const mongoose = require('mongoose');

const recommendation = [`Recommended`, `Not Recommended`];

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timePlayed: {
      type: Number,
      default: 1,
      required: true,
    },
    recommendation: {
      type: String,
      enum: recommendation,
      default: `Recommended`,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

// Helper attribute
ReviewSchema.statics.recommendations = () => recommendation;

module.exports = mongoose.model('Review', ReviewSchema);
