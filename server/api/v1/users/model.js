// Nos permite decir que tipo de variable tendremos en la base de datos

const mongoose = require('mongoose');
const { Schema } = mongoose;

const fields = {
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    }
};

const user = new Schema(fields, {
    timestamps: true, // pa que nos muestre fecha de creación y edición propio de schema, de la libreria de moongose
});

module.exports = { Model: mongoose.model('user', user), fields };
