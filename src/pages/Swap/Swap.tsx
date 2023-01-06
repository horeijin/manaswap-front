import React, { ChangeEvent, useEffect } from "react";
import { Button, TextField, InputAdornment, Theme, makeStyles, createStyles, Container, Paper, Typography } from "@material-ui/core";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";

import { MANA_ADDRESS } from "../../constants/index";
import { toWei, fromWei, onEthToTokenSwap } from "../../utils/ether";
import { getEthToTokenOutputAmount, calculateSlippage } from '../../functions/cpmm';

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
    fullWidth: {
        width: '100%',
    },
    title: {
        textAlign: "center",
        padding: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
    },
    buttonIcon: {
        marginRight: theme.spacing(1),
        padding: theme.spacing(0.4),
    },
    text:{
        fontWeight: 'bold',
        color:'lightgray',
        marginBottom: '30px'
    }
});
const useStyles = makeStyles(styles);

const Swap = (props: any) => {
    const classes = useStyles();

    const [inputValue, setInputValue] = React.useState('');
    const [outputValue, setOutputValue] = React.useState('');
    
    const slippage = 200; //0.02%로 고정, 원래는 슬리피지를 얼마나 허락할 건지 사용자가 고르게하는 버튼 있음
    const account = props.account;
    
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInputValue(event.target.value);
    }

    //function/swap.ts에 있는 CPMM으로 받아야 할 토큰양 계산
    async function getOutputAmount() {
        const output = await getEthToTokenOutputAmount(inputValue, MANA_ADDRESS, props.network); //슬리피지 반영 안된 스왑 결과
        const outputWithSlippage = calculateSlippage(slippage, output).minimum; //토큰 스왑할 땐 슬리피지 최소로해서 반영해야 함
        setOutputValue(fromWei(outputWithSlippage)); //슬리피지 포함된 가격으로 결과값 세팅
        //fromWei()해야 10^18형태 -> string 작은값으로 변환해서 보여줌
    }

    async function onSwap() {
        onEthToTokenSwap(toWei(inputValue), toWei(outputValue), MANA_ADDRESS, props.network);    
        //string의 작은 값 -> 10^18형태로 변환해서 보내줘야 onEthToTokenSwap함수가 계산함
    }

    useEffect( () => {
        getOutputAmount();
    }, [inputValue]);
    
    return (
        <div style={{width:'100%'}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin:'auto'}}>
                <Paper className={classes.paperContainer}>
                    <Typography className={classes.text}>Trade tokens in an instant</Typography>
                    <TextField
                        value={inputValue} //여기에 입력된 값이 inputValue라는 변수로
                        onChange={handleInput}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                        }}
                        variant="standard"
                        style={{marginBottom:'20px'}}
                    />
                    <SwapVerticalCircleIcon style={{fontSize: 30, color:'lightgray', marginTop:'20px', marginBottom:'20px'}}/>
                    <TextField
                        value={outputValue} //입력값에 따라 getOutputAmount()로 계산된 값이 보여짐
                        InputProps={{
                            startAdornment: <InputAdornment position="start">MNA</InputAdornment>
                        }}
                        variant="standard"
                        style={{marginBottom:'40px'}}
                    />
                    <Button style={{background:"#71e4ed", color:'white', fontWeight:'bold'}} variant="contained" onClick={onSwap}>Swap</Button>
                </Paper>
            </div>
        </div>
    )
}
export default Swap;