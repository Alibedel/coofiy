import React, { Component, useCallback, useEffect, useState } from 'react';
import { Link, redirect, Navigate } from 'react-router-dom';
import recipeService from '../../../utils/recipeService';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './UpdateForm.css'
// import styles from './UpdatePage.module.css';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';


const UpdatePageForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    type: "",
    cookTime: 0,
  });
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`useEffect called`);
    const fetchRecipe = async () => {
        const rec = await recipeService.show(id);
        setRecipe(rec);
    }
    fetchRecipe();
  }, [])

  const handleChange = useCallback((e) => {
    console.log(`handleChange name = ${e.target.name}, value = ${e.target.value}`);
    let newRecipe = {
        ...recipe,
    };
    newRecipe[e.target.name] = e.target.value;
    // const eName = e.target.name;
    // const eValue = e.target.value;
    console.log(`handleChange newRecipe = ${JSON.stringify(newRecipe)}`);
    setRecipe(newRecipe);
    // setRecipe((prevValue) => {
    //     return (
    //         ...prevValue,
    //         [eName]: eValue,
    //     );
    // });
  }, [recipe, setRecipe]);

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      const data = await recipeService.update(id, recipe);
    //   this.props.updateStudentState(data)
      //update user variable in state on successful login
    //   this.setState({ redirect: true});
    navigate(`/recipes/${id}`);
      
    } catch (err) {
    //   this.props.updateMessage(err.message);
      // Invalid user data (probably duplicate email)
      //this.props.updateMessage(err.message);
    }
  }

  const isFormInvalid = useCallback(() => {
    return !(recipe.name && recipe.ingredients && recipe.type && recipe.cookTime);
  }, [recipe]);

  return (
    <div>
        <header className="header-footer">Edit Recipe</header>


        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit= {async (e) => await handleSave(e)}>
            <div>
                <TextField
                    type="text"
                    className="form-control"
                    placeholder="name"
                    value={recipe.name}
                    name="name"
                    onChange={handleChange}
                    // defaultValue="Name"
                />
                <TextField
                    type="text"
                    className="form-control"
                    placeholder="ingredients"
                    value={recipe.ingredients}
                    name="ingredients"
                    onChange={handleChange}
                    defaultValue="ingredients"
                />
                <TextField
                    type="text"
                    className="form-control"
                    placeholder="type"
                    value={recipe.type}
                    name="type"
                    onChange={handleChange}
                    defaultValue="type"
                />
                <TextField
                    type="number"
                    className="form-control"
                    placeholder="cook Time"
                    value={recipe.cookTime}
                    name="cookTime"
                    onChange={handleChange}

                />
                

                <button className="btn-editsubmit" disabled={isFormInvalid()}>Submit</button>
                <Link to='/'>Cancel</Link>
            </div>
        </Box>
    </div>
  );

}


export default UpdatePageForm