import React from "react";
import { ButtonGroup, Button, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: "center",
        padding: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
    },
    text:{
        fontWeight: 'bold',
        color:'lightgray',
        marginBottom: '30px'
    },
}));

const SwitchButton = (props: any) => {
    const classes = useStyles();
    const { setAddState } = props;

    return (
        <div style={{ width: '100%' }}>
            <Typography variant="h5" className={classes.title}></Typography>
            <Typography className={classes.text}>유동성 공급/철회 선택</Typography>
            <ButtonGroup size="large" variant="contained">
                <Button
                    id="add-button"
                    onClick={() => {
                        setAddState(true);
                    }}
                    style={{background:"#71e4ed", color:'white', fontWeight:'bold'}}
                >
                    Add Liquidity
                </Button>
                <Button
                    id="add-button"
                    onClick={() => {
                        setAddState(false);
                    }}
                    style={{background:"#71e4ed", color:'white', fontWeight:'bold'}}
                >
                    Remove Liquidity
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default SwitchButton;