const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const recipeSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
ingredients  : {
    type: String,
    required: true
},
type: {
    type: String,
    required: true
},
cookTime : {
    type: Number,
    default: 0
},
user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {
timestamps : true

})

// const recipeSchema = new mongoose.Schema({
//     user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//     recipesLog: [logSchema]
// }, {
//     timestamps : true
// });

module.exports = mongoose.model('Recipe', recipeSchema);










