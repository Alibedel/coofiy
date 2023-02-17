
import React, { useState, useEffect } from 'react';
import recipeService from '../../../utils/recipeService';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetailPage.css'


export default function DetailPage(props) {
  const [recipe, setRrecipe] = useState({});

  //const { id } = props.match?.params || {};
  const {id} = useParams()
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
    console.log('navigate recipes route')
    navigate("/recipes");

    
  }

  const handleUpdate = async () =>{
    console.log('update')
    // const updaterecipe = await recipeService.update(id);
    // console.log(updaterecipe)
    navigate(`/recipes/${recipe._id}/update`);
    
  }

  return (
    <>

        <div >
          <h1>Food's Details:</h1>
          <div className='info' >

            <h3>{recipe.name}</h3>
            <p>Cuisine Type: {recipe.type}</p>
            <p>Ingredients: {recipe.ingredients}</p>
            <p>Cook Time: {recipe.cookTime} hours</p>
          </div>
          <button className='btn-delete' onClick={handleDelete}>DELETE</button>
          <button className='btn-edit' onClick={handleUpdate}>EDIT</button>
        </div>
    
    </>
  );
}