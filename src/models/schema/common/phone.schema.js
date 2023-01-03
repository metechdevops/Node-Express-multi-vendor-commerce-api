import mongoose from 'mongoose';

module.exports = mongoose.Schema({
    code: {
      type: String,
    },
    number:{
        type: String
    }
  }
);
