var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var student = new Schema({
    imageUrl: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    classes: [{ type: String }],
    

});

module.exports = mongoose.model('Student', student);