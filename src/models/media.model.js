// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './plugins/index';

const mediaSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
mediaSchema.plugin(toJSON);

const Media = mongoose.model('Media', mediaSchema);

export default Media;
