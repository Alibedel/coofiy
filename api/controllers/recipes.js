const Recipe = require('../models/recipe');




async function index(req, res) {
    Recipe.find({}, function (err, data) {
        if (err) res.status(404)
        res.status(200).json(data)
    })
}

async function create(req, res) {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.json(recipe)
}

function show(req, res) {
    Recipe.findById(req.params.id, function (err, data) {
        if (err) res.status(404)
        res.status(200).json(data)
    })
}



function deleteRecipe(req, res) {
    Recipe.findByIdAndDelete(req.params.id, function(err, recipe){
        if(err) console.log(err);
        res.status(200).json(recipe)
    })
}

async function update(req, res) {
    try {
        console.log(`update id = ${req.params.id}, body = ${JSON.stringify(req.b)}`)
      const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      return res.statue(200).json(recipe);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  }


module.exports = {
    create,
    index,
    show,
    delete: deleteRecipe,
    update
}