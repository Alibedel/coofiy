import React, { Component } from 'react';
import { Link, redirect } from 'react-router-dom';
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
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      // Successfully signed up - show GamePage
      this.props.setCurrentUser(userService.getUser())
      // window.history.pushState(null, )
      // this.props.history.push('/');
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div>
          <header className="header-footer">Sign Up</header>


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
                          placeholder="Name"
                          value={this.state.name}
                          name="name"
                          onChange={this.handleChange}
                          defaultValue="name"
                      />
                      <TextField
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={this.state.email}
                          name="email"
                          onChange={this.handleChange}
                          defaultValue="email"
                      />
                      <TextField
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={this.state.password}
                          name="password"
                          onChange={this.handleChange}
                          defaultValue="password"
                      />
                      <TextField
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={this.state.passwordConf}
                          name="passwordConf"
                          onChange={this.handleChange}
                          defaultValue="password"
                      />

                      <button className="btn-signup" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
                      <Link to='/'>Cancel</Link>
                  </div>
              </Box>




      </div>
  );
}
}

export default SignupForm;
