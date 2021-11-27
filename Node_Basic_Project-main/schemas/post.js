const mongoose = require("mongoose");
const { Schema } = mongoose;

const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const postSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

postSchema.plugin(autoIncrement.plugin, {
    model: "Post",
    field: "userId",
    startAt: 1,
    increment: 1
})

module.exports = mongoose.model('Post', postSchema);
