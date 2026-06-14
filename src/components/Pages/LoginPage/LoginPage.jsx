import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import userService from '../../../utils/userService'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

class LoginPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      pw: ''
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.setCurrentUser(userService.getUser())
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="page-narrow">
        <div className="card LoginPage">
          <div className="brand-chip"><span role="img" aria-label="cooking">🍳</span> Cookify</div>
          <header className="header-footer">Welcome back</header>
          <p className="auth-sub">Log in to your recipe collection</p>

          <Box component="form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
              type="email"
              label="Email"
              value={this.state.email}
              name="email"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              type="password"
              label="Password"
              value={this.state.pw}
              name="pw"
              onChange={this.handleChange}
              fullWidth
            />
            <div className="form-actions">
              <button className="btn-login">Log In</button>
              <Link to='/'>Cancel</Link>
            </div>
          </Box>
        </div>
      </div>
    );
  }
}

export default LoginPage;
