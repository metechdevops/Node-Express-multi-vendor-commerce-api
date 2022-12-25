import mongoose from 'mongoose';

module.exports = mongoose.Schema({
    image:{
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
  },
);
