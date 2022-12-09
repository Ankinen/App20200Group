const mongoose = require('mongoose');

const FamilySchema = new mongoose.Schema(
  {
    familyname: {
      type: String,
      required: true,
      index: { unique: true }
    },
    familyMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);

const Family = mongoose.model('Family', FamilySchema);
module.exports = Family;