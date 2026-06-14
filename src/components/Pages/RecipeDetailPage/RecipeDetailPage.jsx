import React, { useState, useEffect } from 'react';
import recipeService from '../../../utils/recipeService';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetailPage.css'

export default function DetailPage(props) {
  const [recipe, setRrecipe] = useState({});
  const { id } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await recipeService.show(id);
      setRrecipe(data);
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    await recipeService.delete(id);
    const data = await recipeService.list();
    props.updateRecipeListState(data)
    navigate("/recipes");
  }

  const handleUpdate = async () => {
    navigate(`/recipes/${recipe._id}/update`);
  }

  return (
    <div className="page-narrow">
      <div className="card detail-card">
        <div className="detail-emoji" role="img" aria-label="dish">🍲</div>
        <h1 className="detail-name">{recipe.name}</h1>
        <div className="detail-rows">
          <div className="detail-row"><span>Cuisine type</span><strong>{recipe.type}</strong></div>
          <div className="detail-row"><span>Ingredients</span><strong>{recipe.ingredients}</strong></div>
          <div className="detail-row"><span>Cook time</span><strong>{recipe.cookTime} hours</strong></div>
        </div>
        <div className="detail-actions">
          <button className="btn-edit" onClick={handleUpdate}>Edit</button>
          <button className="btn-delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
