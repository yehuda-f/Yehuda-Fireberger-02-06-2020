import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { CircularProgress, Avatar, Button, TextField, Typography, makeStyles, Container } from '@material-ui/core';

import { userActions } from '../../actions';
import { RootState } from '../../reducers';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    invalid_feedback: {
        color: theme.palette.error.main,
    },
    buttonProgress: {
        color: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -20,
        marginLeft: -20,
    },
}));

function Login(props: any) {
    const classes = useStyles();

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector((state: RootState) => state.authentication.loggingIn);

    useEffect(() => {
        props.logout()
    }, []);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSubmitted(true);
        if (username && password) {
            props.login(username, password)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    {loggingIn && <CircularProgress data-testid="loggingInCircularProgress" size={40} className={classes.buttonProgress} />}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleChange}
                    />
                    {submitted && !username &&
                        <div className={classes.invalid_feedback}>Username is required</div>
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    {submitted && !password &&
                        <div className={classes.invalid_feedback}>Password is required</div>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        data-testid="submitButton"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = (state: RootState) => ({
    authentication: state.authentication,
})

const connected = connect(mapStateToProps, userActions)(Login);
export { connected as Login };

