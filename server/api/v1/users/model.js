const bcrypt = require('bcrypt');
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
    },
    password: {
        type: String,
        required: true
    }
};

const user = new Schema(fields, {
    timestamps: true, // pa que nos muestre fecha de creación y edición propio de schema, de la libreria de moongose
});

user.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

user.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

user.methods.toJSON = function () {
    var obj = this.toObject(); //or var obj = this;
    delete obj.password;
    return obj;
};

module.exports = { Model: mongoose.model('user', user), fields };
