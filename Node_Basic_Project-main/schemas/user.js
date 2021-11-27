const mongoose = require("mongoose");
const { Schema } = mongoose;

const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const UserSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: true,
        match: [/^.[a-zA-Z0-9]{2,}$/, '3글자 이상을 적어주세요']
    },
    userPassword: {
        type: String,
        required: true,
    }
});

UserSchema.plugin(autoIncrement.plugin, {
    model: "Post",
    field: "userId",
    startAt: 1,
    increment: 1
})


module.exports = mongoose.model('User', UserSchema);