import React, { useState, useEffect } from 'react';
import { useSelector, connect } from 'react-redux';

import SwipeableViews from 'react-swipeable-views';

import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Avatar, CircularProgress, TextField, Container, Grid } from '@material-ui/core';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import CallMadeIcon from '@material-ui/icons/CallMade';
import SearchIcon from '@material-ui/icons/Search';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import { messageActions } from '../../actions';
import { RootState } from '../../reducers';
import { IMessageItem } from '../../types';
import { TabPanel, EmailCard, AlertDialog } from '../../components'

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    tabs: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    searchIcon: {
        padding: theme.spacing(4, 1),
        height: '100%',
        position: 'absolute',
        right: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        position: 'relative',
        width: 300,
    },
    buttonProgress: {
        color: 'white',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -20,
        marginLeft: -20,
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

function ManageEmails(props: any) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [emailToDelete, setEmailToDelete] = useState<IMessageItem>({} as IMessageItem);
    const [searchMessages, setSearchMessages] = useState('');

    const deleteEmail = () => {
        props.deleteEmail(emailToDelete.creationDate);
    }

    const searching = useSelector((state: RootState) => state.emails.searching);
    const allEmails = useSelector((state: RootState) => state.emails.allEmails);
    const deleteEmailSuccess = useSelector((state: RootState) => state.deleteEmail.success);

    useEffect(() => {
        return () => {
            props.clearAllEmailsState()
        }
    }, []);

    useEffect(() => {
        if (searchMessages !== '') {
            props.getAllEmails(searchMessages);
        }
    }, [deleteEmailSuccess]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    function handleChangeSearch(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        if (event.target.value !== '') {
            setSearchMessages(event.target.value);
            props.getAllEmails(event.target.value);
        }
    }

    function a11yProps(index: any) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    return (
        <Container component="main" >
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <MailOutlineIcon />
                    {searching && <CircularProgress data-testid="loggingInCircularProgress" size={40} className={classes.buttonProgress} />}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Manage Emails
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="search"
                        label="Search..."
                        name="search"
                        autoComplete="off"
                        autoFocus
                        onChange={handleChangeSearch}
                    />
                </div>
                <div className={classes.tabs}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Sent" icon={<CallMadeIcon />} {...a11yProps(0)} />
                            <Tab label="Received" icon={<CallReceivedIcon />} {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <Grid container className={classes.cardGrid} spacing={4}>
                                {allEmails &&
                                    (allEmails.sent.length > 0 ?
                                        allEmails.sent.map((email, index) =>
                                            <EmailCard key={index} email={email} setConfirmOpen={setConfirmOpen} setDeleteEmail={setEmailToDelete} />
                                        )
                                        : 'No sent messages matched your search.'
                                    )
                                }
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <Grid container className={classes.cardGrid} spacing={4}>
                                {allEmails &&
                                    (allEmails.received.length > 0 ?
                                        allEmails.received.map((email, index) =>
                                            <EmailCard key={index} email={email} setConfirmOpen={setConfirmOpen} setDeleteEmail={setEmailToDelete} />
                                        )
                                        : 'No received messages matched your search.'
                                    )
                                }
                            </Grid>
                        </TabPanel>
                    </SwipeableViews>
                </div>
            </div>
            <AlertDialog
                title="Delete Email?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={deleteEmail}
            >
                <EmailCard
                    key={emailToDelete.creationDate}
                    email={emailToDelete}
                    showDeleteButton={false}
                    setConfirmOpen={setConfirmOpen}
                    setDeleteEmail={setEmailToDelete}
                    sm={12}
                    md={12}
                />
                <br />
                Are you sure you want to delete this Email?
            </AlertDialog>
        </Container >
    );
}

const mapStateToProps = (state: RootState) => ({
    searchEmails: state.emails,
})

const connected = connect(mapStateToProps, messageActions)(ManageEmails);
export { connected as ManageEmails };
