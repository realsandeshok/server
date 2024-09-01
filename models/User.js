const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true },
    role: {type: String, enum:['admin', 'stockManager', 'user'], required: true}
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password) 
}

module.exports = mongoose.model('User', userSchema) 