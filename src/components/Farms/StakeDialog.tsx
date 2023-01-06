import React from "react";
import PropTypes from "prop-types";
import {
    Theme,
    Button,
    Dialog,
    Grid,
    IconButton,
    makeStyles,
    createStyles,
    TextField,
    Typography,
    withStyles,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import * as COLORS from "@material-ui/core/colors";

import { stake } from "../../functions/farms/farms";
import { getTokenBalanceAndSymbol } from "../../utils/ether";

const styles = (theme: Theme) => createStyles({
    dialogContainer: {
        borderRadius: theme.spacing(2),
    },
    titleSection: {
        padding: theme.spacing(2),
    },
    titleText: {
        alignSelf: "center",
    },
    hr: {
        margin: 0,
    },
    address: {
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
        paddingBottom: theme.spacing(2),
    },
    coinList: {
        height: "300px",
        overflowY: "scroll",
    },
    coinContainer: {
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(2),
        overflow: "hidden",
    },
});

const useStyles = makeStyles(styles);

// This is a modified version of MaterialUI's DialogTitle component, I've added a close button in the top right corner
const DialogTitle = withStyles(styles)((props: any) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle
            disableTypography
            className={classes.titleSection}
            {...other}
        >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignContent="center"
            >
                <Typography variant="h6" className={classes.titleText}>
                    {children}
                </Typography>
                {onClose ? (
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </Grid>
        </MuiDialogTitle>
    );
});

// This is a modified version of MaterialUI's DialogActions component, the color has been changed by modifying the CSS
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        backgroundColor: COLORS.grey[100],
    },
}))(MuiDialogActions);

StakeDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    pid: PropTypes.number.isRequired,
    userAddress: PropTypes.string.isRequired,
    lpAddress: PropTypes.string.isRequired,
    chainId: PropTypes.number.isRequired
};


export default function StakeDialog(props: any) {

    const classes = useStyles();
    const { onClose, open, pid, userAddress, lpAddress, chainId } = props;

    const [amount, setAmount] = React.useState("");
    const [error, setError] = React.useState("");

    // Resets any fields in the dialog (in case it's opened in the future) and calls the `onClose` prop
    const exit = (value: string) => {
        setError("");
        setAmount("");
        onClose();
    };

    // Called when the user tries to input a custom address, this function will validate the address and will either
    // then close the dialog and return the validated address, or will display an error.
    const submit = async () => {
        await stake(pid, amount, chainId);
        exit(amount);
    };

    const getMaxAmount = async () => {
        const balance = await getTokenBalanceAndSymbol(userAddress, lpAddress);
        console.log(balance);
        setAmount(balance.balance)
    }

    return (
        <Dialog
            open={open}
            onClose={() => exit(undefined!)}
            fullWidth
            maxWidth="sm"
            classes={{ paper: classes.dialogContainer }}
        >
            <DialogTitle onClose={() => exit(undefined!)}>Stake LP Token</DialogTitle>

            <hr className={classes.hr} />

            <div className={classes.coinContainer}>
                <Grid container direction="row" spacing={1} alignContent="center">
                    <Grid item xs={10}>
                        <TextField
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            variant="outlined"
                            placeholder="LP Token Amount"
                            error={error !== ""}
                            helperText={error}
                            fullWidth
                            className={classes.address}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button 
                            color="primary"
                            onClick={getMaxAmount}>
                            Max
                        </Button>
                    </Grid>

                </Grid>

                <hr className={classes.hr} />

            </div>

            <hr className={classes.hr} />

            <DialogActions>
                <Button autoFocus onClick={submit} color="primary">
                    Enter
                </Button>
            </DialogActions>
        </Dialog>
    )
}