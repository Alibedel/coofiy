import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import recipeService from '../../../utils/recipeService';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './UpdateForm.css'

const UpdatePageForm = () => {
  const [recipe, setRecipe] = useState({ name: "", ingredients: "", type: "", cookTime: 0 });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const rec = await recipeService.show(id);
      setRecipe(rec);
    }
    fetchRecipe();
  }, [id])

  const handleChange = useCallback((e) => {
    let newRecipe = { ...recipe };
    newRecipe[e.target.name] = e.target.value;
    setRecipe(newRecipe);
  }, [recipe, setRecipe]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await recipeService.update(id, recipe);
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  const isFormInvalid = useCallback(() => {
    return !(recipe.name && recipe.ingredients && recipe.type && recipe.cookTime);
  }, [recipe]);

  return (
    <div className="page-narrow">
      <div className="card">
        <div className="brand-chip"><span role="img" aria-label="cooking">🍳</span> Cookify</div>
        <header className="header-footer">Edit recipe</header>
        <p className="auth-sub">Update the details and save your changes</p>

        <Box component="form" noValidate autoComplete="off" onSubmit={async (e) => await handleSave(e)}>
          <TextField type="text" label="Name" value={recipe.name} name="name" onChange={handleChange} fullWidth />
          <TextField type="text" label="Ingredients" value={recipe.ingredients} name="ingredients" onChange={handleChange} fullWidth />
          <TextField type="text" label="Cuisine type" value={recipe.type} name="type" onChange={handleChange} fullWidth />
          <TextField type="number" label="Cook time (hours)" value={recipe.cookTime} name="cookTime" onChange={handleChange} fullWidth />
          <div className="form-actions">
            <button className="btn-editsubmit" disabled={isFormInvalid()}>Save changes</button>
            <Link to='/'>Cancel</Link>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default UpdatePageForm
