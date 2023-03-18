import React, {useMemo} from 'react';
import {NavLink} from 'react-router-dom';

import {AppBar as NavBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container} from '@mui/material';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import MenuIcon from '@mui/icons-material/Menu';

import {routes} from '../../../router/routes';

const pages = [{
    title: 'Courses',
    link: routes.courseList
}];

export const AppBar = () => {
    const navElements = useMemo(() => pages.map((page) => (
        <MenuItem key={page.title}>
            <NavLink to={page.link}>{page.title}</NavLink>
        </MenuItem>
    )), []);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <NavBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: 'flex'}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
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
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: 'block'
                            }}
                        >
                            {navElements}
                        </Menu>
                    </Box>
                    <CodeOffIcon sx={{mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="p"
                        sx={{
                            mr: 2,
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        <NavLink to={routes.courseList}>
                            IT Generation
                        </NavLink>
                    </Typography>
                </Toolbar>
            </Container>
        </NavBar>
    );
};
