import React from 'react';
import moment from 'moment';

import { Grid, Card, CardContent, Typography, CardActions, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { IMessageItem } from '../types';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    deleteIconButton: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

interface IAccountCardProps {
    email: IMessageItem,
    setConfirmOpen: Function,
    setDeleteEmail: Function,
    showDeleteButton?: boolean,
    sm?: 6 | 12,
    md?: 4 | 12,
}

export function EmailCard(props: IAccountCardProps) {
    const { email, setConfirmOpen, setDeleteEmail, showDeleteButton = true, sm = 6, md = 4 } = props;
    const classes = useStyles();

    return (
        <Grid item key={email.creationDate} xs={12} sm={sm} md={md} >
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4">
                        {email.subject}
                    </Typography>
                    <Typography color="textSecondary">
                        {moment.utc(email.creationDate).format('MMMM Do YYYY, HH:mm:ss')}
                        <br />
                        From: {email.sender}
                        <br />
                            To: {email.receiver}
                    </Typography>
                    <Typography color="textPrimary" variant="h5">
                        {email.message}
                    </Typography>
                </CardContent>
                <CardActions>
                    {showDeleteButton &&
                        <Tooltip title="Delete">
                            <IconButton className={classes.deleteIconButton} aria-label="delete" onClick={() => { setConfirmOpen(true); setDeleteEmail(email) }} >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </CardActions>
            </Card>
        </Grid>
    );
}