
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Recipe = require('../models/recipe')
//const SECRET = process.env.SECRET;
const SECRET = 'SEIRocks'

module.exports = {
  signup,
  login
};

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const recipeBook = await createRecipeBook(user)
    // TODO: Send back a JWT instead of the user
    const token = createJWT(user);
    res.json({ token, user, recipeBook });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res){
  try {
      const user = await User.findOne({email : req.body.email});
      if(!user){
          return res.status(401).json({err : 'User Not found! '});
      }
      user.comparePassword(req.body.pw, (err, isMatch) => {
          if(isMatch){
              const token = createJWT(user);
              res.json({token})
          }
          else {
              return res.status(401).json({err: 'bad password'});
          }
      });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
}

function createJWT(user) {
    return jwt.sign(
      {user}, // data payload
      SECRET,
      {expiresIn: '24h'}
    );
}

async function createRecipeBook(newUser){
  let newRecipeBook = await new Recipe();
  newRecipeBook.save(function(err){
    if(err) {
      console.log(err)
      return ({err})
    }
    return (newRecipeBook)
  })
}