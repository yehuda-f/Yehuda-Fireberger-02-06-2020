import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Grid, Toolbar, Typography, Button } from '@material-ui/core';

import { RootState } from '../reducers';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        emailButton: {
            marginRight: theme.spacing(2),
            marginLeft: theme.spacing(2),
        },
    }),
);

export function TopBar() {
    const classes = useStyles();
    const authentication = useSelector((state: RootState) => state.authentication);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6">
                            Hello {authentication.loggedIn ? authentication.user?.username : "guest"}!
                        </Typography>
                        <div>
                            <Button color="inherit" className={classes.emailButton} component={Link} to={'/compose-email'}>Compose Email</Button>
                            <Button color="inherit" className={classes.emailButton} component={Link} to={'/'}>Manage Emails</Button>
                        </div>
                        <div>
                            {authentication.loggedIn
                                ? <Button color="inherit" component={Link} to={'/login'}>Logout</Button>
                                : <Fragment>
                                    <Button color="secondary" variant="contained" component={Link} to={'/login'}>Login</Button>
                                    <Button color="inherit" component={Link} to={'/register'}>Register</Button>
                                </Fragment>
                            }
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}