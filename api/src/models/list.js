// Require the mongoose library
const mongoose = require('mongoose');

//Määritetään mallin tietokantaskeema
const ListSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        disabled: {
            type: Boolean,
            required: true
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        favoritedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
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