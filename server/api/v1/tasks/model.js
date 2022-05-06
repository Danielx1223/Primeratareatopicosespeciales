const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
    }
};

const references = {
    //  ver quien escribió
    userID: {
        type: Schema.Types.ObjectId, //  enlazar el usuario con el tweet que publique.
        ref: 'user',
        required: true,
    },
};

const task = new Schema(Object.assign(fields, references), {
    timestamps: true, // pa que nos muestre fecha de creación y edición propio de schema, de la libreria de moongose
});

module.exports = { Model: mongoose.model('task', task), fields, references };
