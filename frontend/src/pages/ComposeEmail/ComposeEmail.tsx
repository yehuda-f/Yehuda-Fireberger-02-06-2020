import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';

import { Avatar, CircularProgress, Button, TextField, Grid, Typography, Container } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { makeStyles } from '@material-ui/core/styles';

import { messageActions } from '../../actions';
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
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
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

function ComposeEmail(props: any) {
    const classes = useStyles();

    const [inputs, setInputs] = useState({
        sender: '',
        receiver: '',
        subject: '',
        message: '',
    });

    const { sending, success } = useSelector((state: RootState) => state.composeEmail);

    useEffect(() => {
        if (success) {
            clearForm()
        }
    }, [success]);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(this: any, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!Object.values(inputs).some(x => (x === ''))) {
            props.send(inputs);
        }
    }

    const clearForm = () => {
        (document.getElementById("compose-form") as HTMLFormElement)?.reset();
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <MailOutlineIcon />
                    {sending && <CircularProgress data-testid="loggingInCircularProgress" size={40} className={classes.buttonProgress} />}
                </Avatar>
                <Typography component="h1" variant="h5">
                    New Email
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} id="compose-form">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="receiver"
                                name="receiver"
                                variant="outlined"
                                required
                                fullWidth
                                id="receiver"
                                label="To"
                                autoFocus
                                onChange={handleChange}
                                disabled={sending}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="sender"
                                label="From"
                                name="sender"
                                autoComplete="sender"
                                onChange={handleChange}
                                disabled={sending}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="subject"
                                label="Subject"
                                name="subject"
                                autoComplete="subject"
                                onChange={handleChange}
                                disabled={sending}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                rows={6}
                                name="message"
                                label="Message"
                                id="message"
                                onChange={handleChange}
                                disabled={sending}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={sending}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = (state: RootState) => ({
    composeEmail: state.composeEmail,
})

const connected = connect(mapStateToProps, messageActions)(ComposeEmail);
export { connected as ComposeEmail };