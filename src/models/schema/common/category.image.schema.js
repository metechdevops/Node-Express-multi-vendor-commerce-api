import mongoose from 'mongoose';

module.exports = mongoose.Schema({
    original: {
        type: String
    },
    web: {
        type: String
    },
    mobile: {
        type: String
    },
  },
);
