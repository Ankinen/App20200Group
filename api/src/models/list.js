// Require the mongoose library
const mongoose = require('mongoose');

//Määritetään mallin tietokantaskeema
const ListSchema = new mongoose.Schema(
    {
        listName: {
            type: String,
            required: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
        },
        disabled: {
            type: Boolean,
            required: true
        }
    },

    {
        //Luo aikaleimakentät
        timestamps: true
    }
);

// Luo malli
const List = mongoose.model('List', ListSchema);

// Paljasta malli
module.exports = List;