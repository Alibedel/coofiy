import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './SignupForm.css'

class SignupForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  };

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      this.props.setCurrentUser(userService.getUser())
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className="page-narrow">
        <div className="card">
          <div className="brand-chip"><span role="img" aria-label="cooking">🍳</span> Cookify</div>
          <header className="header-footer">Create your account</header>
          <p className="auth-sub">Start saving and organizing your recipes</p>

          <Box component="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField type="text" label="Name" value={this.state.name} name="name" onChange={this.handleChange} fullWidth />
            <TextField type="email" label="Email" value={this.state.email} name="email" onChange={this.handleChange} fullWidth />
            <TextField type="password" label="Password" value={this.state.password} name="password" onChange={this.handleChange} fullWidth />
            <TextField type="password" label="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} fullWidth />
            <div className="form-actions">
              <button className="btn-signup" disabled={this.isFormInvalid()}>Sign Up</button>
              <Link to='/'>Cancel</Link>
            </div>
          </Box>
        </div>
      </div>
    );
  }
}

export default SignupForm;
