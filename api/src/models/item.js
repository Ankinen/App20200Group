const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      index: { unique: true }
    },
    quantity: {
      type: String,
      required: true,
      index: { unique: true }
    },
    itemList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    }
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;