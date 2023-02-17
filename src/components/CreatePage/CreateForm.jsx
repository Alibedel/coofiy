import React, { Component } from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import recipeService from '../../utils/recipeService';
// import './CreateStudentForm.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
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
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await recipeService.create(this.state);
            this.props.updateRecipeListState(data);
            this.setState({
                id: data._id,
                submitted: true,
            })
            // navigate(`recipes/${data._id}`)

        } catch (err) {
            this.props.updateMessage(err.message);
        }
    }

    isFormInvalid() {
        return !(this.state.name && this.state.ingredients && this.state.type && this.state.cookTime );
    }

    render() {
        return (
            <div>
                {this.state.submitted && <Navigate to={`/recipes/${this.state.id}`} />}
                <header className="header-footer">Add Recipe</header>
    
    
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                       onSubmit= {this.handleSubmit}>
                        <div>
                            <TextField
                                type="text"
                                className="form-control"
                                placeholder="name"
                                value={this.state.name}
                                name="name"
                                onChange={this.handleChange}
                                // defaultValue="Name"
                            />
                            <TextField
                                type="text"
                                className="form-control"
                                placeholder="ingredients"
                                value={this.state.ingredients}
                                name="ingredients"
                                onChange={this.handleChange}
                                defaultValue="ingredients"
                            />
                            <TextField
                                type="text"
                                className="form-control"
                                placeholder="type"
                                value={this.state.type}
                                name="type"
                                onChange={this.handleChange}
                                defaultValue="type"
                            />
                            <TextField
                                type="number"
                                className="form-control"
                                placeholder="cook Time"
                                value={this.state.cookTime}
                                name="cookTime"
                                onChange={this.handleChange}
    
                            />
                            
    
                            <button className="btn-create" disabled={this.isFormInvalid()}>Submit</button>&nbsp;&nbsp;
                            <Link to='/'>Cancel</Link>
                        </div>
                    </Box>
    
    
    
    
            </div>
        );
    }
}

export default CreateForm;