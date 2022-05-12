import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import img from '../../img/iconava.png'

export default function Ava() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const LogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    window.location.href = '/'
  }
  const Profile = () => {
    window.location.href = '/profile'
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar 
              alt = "avatar"
              src = {img}
              sx={{ width:70, height: 70 }}
            >U</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            bgcolor: '#5fd2ff',
            border: '2px',
            borderColor: 'black',
            '& .MuiAvatar-root': {
              width: 30,
              height: 32,
              ml: -0.5,
              mr: 1,
              bgcolor: 'blue'
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 34,
              width: 10,
              height: 10,
              bgcolor: '#5fd2ff',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={Profile} style={{
            paddingBottom: '10px',
          }}>
            <Avatar /> <b>Profile</b>
        </MenuItem>
        <MenuItem onClick={Profile} style={{
            marginBottom: '200px',
            paddingRight: '60px',
            paddingBottom: '10px'
          }}>
          Đóng góp ý kiến
        </MenuItem>
        <Divider />
        <MenuItem onClick={LogOut}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Đăng Xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
