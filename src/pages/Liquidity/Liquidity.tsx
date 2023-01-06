import React, { useState } from "react";
import {
    Theme,
    Container,
    makeStyles,
    createStyles,
    Paper,
    Typography,
} from "@material-ui/core";

import CreateExchange from "./CreateExchange"
import SwitchButton from './SwitchButton';
import AddLiquidity from './AddLiquidity';
import RemoveLiquidity from './RemoveLiquidity';

const styles = (theme: Theme) => createStyles({
    paperContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: theme.spacing(2),
        padding: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        maxWidth: 700,
        marginTop: "100px",
    },
    title: {
        textAlign: "center",
        padding: theme.spacing(0.5),
        marginBottom: theme.spacing(5),
    },
    text:{
        fontWeight: 'bold',
        color:'lightgray',
        marginBottom: '30px'
    },
    fullWidth: {
        width: '100%',
    },
});
const useStyles = makeStyles(styles);

const Liquidity = (props: any) => {
    const classes = useStyles();

    const [addState, setAddState] = React.useState(true);

    const add_or_remove = (deploy: boolean) => {
        if (deploy === true) {
            return <AddLiquidity network={props.network} account={props.account} />;
        }
        return <RemoveLiquidity network={props.network} account={props.account} />;
    };

    return (
        <div style={{width:'100%'}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'auto'}}>
                <Paper className={classes.paperContainer}>
                    <Typography className={classes.text}>토큰페어 레시피 만드는 createExchange</Typography>
                    <CreateExchange network={props.network} account={props.account}/>

                    <Typography variant="h5" className={classes.title}>
                        <SwitchButton setAddState={setAddState} />
                    </Typography>
                    {add_or_remove(addState)}
                </Paper>
            </div>
        </div>
    )
} 

export default Liquidity;