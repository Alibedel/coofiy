import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import recipeService from '../../utils/recipeService';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './CreateForm.css'

class CreateForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: '',
      name: '',
      ingredients: '',
      type: '',
      cookTime: '',
      submitted: false,
    };
  }

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await recipeService.create(this.state);
      this.props.updateRecipeListState(data);
      this.setState({ id: data._id, submitted: true });
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.ingredients && this.state.type && this.state.cookTime);
  }

  render() {
    return (
      <div className="page-narrow">
        {this.state.submitted && <Navigate to={`/recipes/${this.state.id}`} />}
        <div className="card">
          <div className="brand-chip"><span role="img" aria-label="cooking">🍳</span> Cookify</div>
          <header className="header-footer">Add a recipe</header>
          <p className="auth-sub">Save a new dish to your collection</p>

          <Box component="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField type="text" label="Name" value={this.state.name} name="name" onChange={this.handleChange} fullWidth />
            <TextField type="text" label="Ingredients" value={this.state.ingredients} name="ingredients" onChange={this.handleChange} fullWidth />
            <TextField type="text" label="Cuisine type" value={this.state.type} name="type" onChange={this.handleChange} fullWidth />
            <TextField type="number" label="Cook time (hours)" value={this.state.cookTime} name="cookTime" onChange={this.handleChange} fullWidth />
            <div className="form-actions">
              <button className="btn-create" disabled={this.isFormInvalid()}>Submit</button>
              <Link to='/'>Cancel</Link>
            </div>
          </Box>
        </div>
      </div>
    );
  }
}

export default CreateForm;
