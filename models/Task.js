const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    }
},
    {
        timestamps: true,
    }
)

const Task = mongoose.model('task', taskSchema);

module.exports = Task;