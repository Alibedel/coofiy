import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MenuBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #C44900 0%, #E8590C 45%, #F77F00 100%)',
        boxShadow: '0 10px 24px -16px rgba(120,60,10,0.8)'
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1, display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'Poppins, sans-serif', fontWeight: 800, letterSpacing: '.3px',
            color: '#fff', textDecoration: 'none'
          }}
        >
          <span role="img" aria-label="cooking">🍳</span> Cookify
        </Typography>
        {props.menuOptions.map((option) =>
          option.showAuth && (
            <Button
              key={option.label}
              color="inherit"
              component={Link}
              to={option.label}
              onClick={option.hasLogoutOption ? props.handleLogout : null}
              sx={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 600,
                textTransform: 'capitalize', borderRadius: '10px', mx: 0.3,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.16)' }
              }}
            >
              {option.label}
            </Button>
          )
        )}
        <Avatar
          onClick={handleMenuOpen}
          sx={{ cursor: 'pointer', marginLeft: 2, bgcolor: 'rgba(255,255,255,0.22)' }}
        />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {['Profile', 'Account', 'Dashboard', 'Logout'].map((item) => (
            <MenuItem key={item} onClick={handleMenuClose}>
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
