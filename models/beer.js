/**
 * Created by faisalkanout on 06/02/2016.
 */
var mongoose = require('mongoose');

// Define our beer schema
var BeerSchema   = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number,
    userId: String

});

// Export the Mongoose model
module.exports = mongoose.model('Beer', BeerSchema);