import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'
import { Cyclone as CycloneIcon, Menu as MenuIcon } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { routes } from 'utils/urlRoutes.js'

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [openNav, setOpenNav] = useState(false)
  const location = useLocation()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
    setOpenNav(true)
  }

  const handleCloseNavMenu = () => {
    setOpenNav(false)
  }

  const activeNav = { borderBottom: '3px solid #01579b' }

  return (
    <AppBar position="relative">
      <Toolbar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CycloneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Approducts
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={openNav}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {Object.values(routes).map((route) => (
                  <Link
                    key={route.name}
                    to={route.path}
                    style={{
                      textDecoration: 'none'
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{route.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <CycloneIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              APPRODUCTS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {Object.values(routes).map((route) => (
                <Link
                  key={route.name}
                  to={route.path}
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    style={location.pathname === route.path ? activeNav : {}}
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block'
                    }}
                  >
                    {route.name}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
