import mongoose from 'mongoose';

const stringSchema = {
    link: {
        type: String,
    },
    s3Id: {
        type: String,
    }
}

module.exports = mongoose.Schema({
    nationalIdentityNumber: {
        type: String,
    },
    passportNumber: {
        type: String,
    },
    drivingLicenseNumber: {
        type: String,
    },
    vehicleRegistrationNumber: {
        type: String,
    },
    rootPermit: [stringSchema],
    characrCertifiate: [stringSchema],
    insuranceDocument: [stringSchema],
    certifiedCopy: [stringSchema],
    veichleImage: [stringSchema],
    addressProof: [stringSchema]
  },
);
