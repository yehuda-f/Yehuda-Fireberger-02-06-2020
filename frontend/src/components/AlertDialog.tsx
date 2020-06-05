import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export function AlertDialog(props: any) {
    const { title, children, open, setOpen, onConfirm } = props;

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent id="alert-dialog-description" >{children}</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={() => { setOpen(false); onConfirm(); }} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
