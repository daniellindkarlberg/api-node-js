var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var teacher = new Schema({

    firstName: { type: String },
    lastName: { type: String },

});

module.exports = mongoose.model('Teacher', teacher);