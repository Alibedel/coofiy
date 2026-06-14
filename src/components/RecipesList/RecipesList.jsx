import { Link } from 'react-router-dom';
import './RecipesList.css';

export default function RecipesList(props) {
  const recipes = props.recipes || [];

  return (
    <div className="page">
      <div className="recipes-head">
        <h1 className="recipes-title">Your Recipes</h1>
        <Link to="/create" className="add-recipe-btn">+ Add Recipe</Link>
      </div>

      {recipes.length === 0 ? (
        <div className="recipes-empty">
          <div className="recipes-empty-emoji" role="img" aria-label="plate">🍽️</div>
          <p>No recipes yet. Add your first one to get cooking!</p>
          <Link to="/create" className="add-recipe-btn">+ Add Recipe</Link>
        </div>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <Link to={`/recipes/${recipe._id}`} className="recipe-card" key={recipe._id}>
              <div className="recipe-card-emoji" role="img" aria-label="dish">🍲</div>
              <div className="recipe-card-body">
                <span className="recipe-card-name">{recipe.name}</span>
                {recipe.type && <span className="recipe-card-type">{recipe.type}</span>}
              </div>
              <span className="recipe-card-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
