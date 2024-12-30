const mongoose = require('../db/db');

const TaskSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, {timestamps: true});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;