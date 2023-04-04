import mongoose from 'mongoose';
import Service from './../../service.model';

// Plugins
import toJSON from './../../plugins/index';

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    service: {
      type: mongoose.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Review must belong to a service']
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    },
    reviewDate: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      get: (date) => date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true,getters: true,upsert: true  },
    toObject: { virtuals: true },
    
  }
);

// add plugin that converts mongoose to json
reviewSchema.plugin(toJSON);

reviewSchema.index({ service: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (serviceId) {
  const stats = await this.aggregate([
    {
      $match: { service: serviceId }
    },
    {
      $group: {
        _id: '$service',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  // console.log(stats);

  if (stats.length > 0) {
    await Service.findByIdAndUpdate(serviceId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Service.findByIdAndUpdate(serviceId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.service);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findByIdAnd/, async function (next) {
  this.rev = await this.findOne();
  next();
});

reviewSchema.post(/^findByIdAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.rev.constructor.calcAverageRatings(this.rev.service);
});

const serviceReview = mongoose.model('serviceReview', reviewSchema);

export default serviceReview;
