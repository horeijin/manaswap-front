import React, { useEffect } from "react";
import {
    Grid,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { useSnackbar } from "notistack";

import TokenSelectDialog from "../../components/TokenSelectDialog/TokenSelectDialog";
import TokenInputField from "../../components/TokenInputField";
import LoadingButton from "../../components/LoadingButton";

import { getTokenBalanceAndSymbol, getAccountBalance } from "../../utils/ether";
import { getReserves, getLPTokenAmount } from "../../functions/cpmm";
import { addLiquidity } from "../../functions/Liquidity";
import { padding } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    fullWidth: {
        width: "100%",
    },
    values: {
        width: "50%",
    },
    title: {
        textAlign: "center",
        padding: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
    },
    balance: {
        padding: theme.spacing(1),
        overflow: "wrap",
        textAlign: "right",
        fontSize: '15px',
    },
    buttonIcon: {
        marginRight: theme.spacing(1),
        padding: theme.spacing(0.4),
    },
    text:{
        fontWeight: 'bold',
        color:'lightgray',
        marginBottom: '30px'
    },
}));

const AddLiquidity = (props: any) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    // Stores a record of whether their respective dialog window is open
    const [dialog1Open, setDialog1Open] = React.useState(false);
    const [dialog2Open, setDialog2Open] = React.useState(false);

    // Stores data about their respective coin
    const [coin1, setCoin1] = React.useState({
        symbol: "",
        balance: "",
    });
    const [coin2, setCoin2] = React.useState({
        address: "",
        symbol: "",
        balance: "",
    });

    // Stores the current reserves in the liquidity pool between coin1 and coin2
    const [reserves, setReserves] = React.useState(["0.0", "0.0"]);

    // Stores the current value of their respective text box
    const [field1Value, setField1Value] = React.useState("");
    const [field2Value, setField2Value] = React.useState("");

    // Controls the loading button
    const [loading, setLoading] = React.useState(false);

    // Stores the user's balance of liquidity tokens for the current pair
    const [liquidityTokens, setLiquidityTokens] = React.useState("");

    // Used when getting a quote of liquidity
    const [liquidityOut, setLiquidityOut] = React.useState([0, 0, 0]);

    // These functions take an HTML event, pull the data out and puts it into a state variable.
    const handleChange = {
        field1: (e: any) => {
            setField1Value(e.target.value);
        },
        field2: (e: any) => {
            setField2Value(e.target.value);
        },
    };

    // Turns the account's balance into something nice and readable
    const formatBalance = (balance: string, symbol: string) => {
        if (balance && symbol)
            return parseFloat(balance).toPrecision(8) + " " + symbol;
        else return "0.0";
    };

    // Turns the coin's reserves into something nice and readable
    const formatReserve = (reserve: string, symbol: string) => {
        if (reserve && symbol) return reserve + " " + symbol;
        else return "0.0";
    };

    // Determines whether the button should be enabled or not
    const isButtonEnabled = () => {

        // If both coins have been selected, and a valid float has been entered for both, which are less than the user's balances, then return true
        const parsedInput1 = parseFloat(field1Value);
        const parsedInput2 = parseFloat(field2Value);
        return (
            coin2.address &&
            !Number.isNaN(parsedInput1) &&
            0 < parsedInput1 &&
            !Number.isNaN(parsedInput2) &&
            0 < parsedInput2 &&
            parsedInput1 <= parseFloat(coin1.balance) &&
            parsedInput2 <= parseFloat(coin2.balance)
        );
    };


    const callAddLiquidity = async () => {
        console.log("Attempting to add liquidity...");
        setLoading(true);
        addLiquidity(reserves, field1Value, field2Value, coin2.address, props.network).then(() => {
            setLoading(false);
        });
    }

    // Called when the dialog window for coin1 exits
    const onToken1Selected = (tokenAddress: string) => {
        // Cldㄱose the dialog window
        setDialog1Open(false);
        if (tokenAddress == "ETH") {
            getAccountBalance(props.account)
                .then((data) => {
                    setCoin1({
                        symbol: data.symbol,
                        balance: data.balance
                    })
                })
        } else {
            getTokenBalanceAndSymbol(props.account, tokenAddress)
                .then((data) => {
                    setCoin2({
                        address: tokenAddress,
                        symbol: data.symbol,
                        balance: data.balance
                    })
                });
        }
    }

    // Called when the dialog window for coin1 exits
    const onToken2Selected = (tokenAddress: string) => {
        // Close the dialog window
        setDialog2Open(false);
        if (tokenAddress == "ETH") {
            getAccountBalance(props.account)
                .then((data) => {
                    setCoin2({
                        address: tokenAddress,
                        symbol: data.symbol,
                        balance: data.balance
                    })
                })
        } else {
            getTokenBalanceAndSymbol(props.account, tokenAddress)
                .then((data) => {
                    setCoin2({
                        address: tokenAddress,
                        symbol: data.symbol,
                        balance: data.balance
                    })
                });
        }

    }


    // This hook is called when either of the state variables `coin1.address` or `coin2.address` change.
    // This means that when the user selects a different coin to convert between, or the coins are swapped,
    // the new reserves will be calculated.
    useEffect(() => {
        console.log(
            "Trying to get reserves between:\n" + coin2.address
        );

        getReserves(coin2.address, props.network).then((reserves) => {
            setReserves(reserves);
        });
        getLPTokenAmount(coin2.address, props.account, props.network).then((balance) => {
            setLiquidityTokens(balance);
        });
        getAccountBalance(props.account)
            .then((data) => {
                setCoin1({
                    symbol: data.symbol,
                    balance: data.balance
                })
            })
            getTokenBalanceAndSymbol(props.account, coin2.address)
                .then((data) => {
                    setCoin2({
                        address: coin2.address,
                        symbol: data.symbol,
                        balance: data.balance
                    })
                });
    }, [coin2.address, props.network, props.account]);

    // This hook creates a timeout that will run every ~10 seconds, it's role is to check if the user's balance has
    // updated has changed. This allows them to see when a transaction completes by looking at the balance output.
    useEffect(() => {
        const coinTimeout = setTimeout(() => {
            console.log("Checking balances & Getting reserves...");

            getReserves(coin2.address, props.network).then((reserves) => {
                setReserves(reserves);
            });
            getLPTokenAmount(coin2.address, props.account, props.network).then((balance) => {
                setLiquidityTokens(balance);
            });
        }, 10000);

        return () => clearTimeout(coinTimeout);
    });
    return (
        <div style={{width:'500px'}}>
            <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', margin:'auto'}}>
                <Typography variant="h5" className={classes.title}></Typography>
                <Typography className={classes.text}>유동성 공급할 토큰 페어 선택</Typography>

                <TokenSelectDialog open={dialog1Open} onClose={onToken1Selected}/> {/* 토큰 선택창*/}
                <TokenSelectDialog open={dialog2Open} onClose={onToken2Selected}/>

                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item xs={10} className={classes.fullWidth}>
                        <Typography variant="body1" className={classes.balance}>
                            Balance : {formatBalance(coin1.balance, coin1.symbol)}
                        </Typography>
                        <TokenInputField
                            activeField={true}
                            value={field1Value}
                            onClick={() => setDialog1Open(true)}
                            onChange={handleChange.field1}
                            symbol={coin1.symbol !== "" ? coin1.symbol : "Select"}
                        />
                    </Grid>
                    <Grid item xs={10} className={classes.fullWidth}>
                        <Typography variant="body1" className={classes.balance}>
                            Balance : {formatBalance(coin2.balance, coin2.symbol)}
                        </Typography>
                        <TokenInputField
                            activeField={true}
                            value={field2Value}
                            onClick={() => setDialog2Open(true)}
                            onChange={handleChange.field2}
                            symbol={coin2.symbol !== "" ? coin2.symbol : "Select"}
                        />
                    </Grid>
                </Grid>
            </div>

            <div style={{ display: 'flex', 
                flexDirection:'row', 
                justifyContent: 'space-evenly',
                margin:'auto', 
                border: '2px solid', 
                borderRadius:'10px', 
                borderColor:'#71e4ed', 
                marginTop:'30px',
                marginBottom:'30px',
                padding:'20px'}}>
                <div>
                    {/* 유동성 풀에 있는 토큰페어 양 */}
                    <Typography className={classes.text}>Reserves</Typography>
                    <Typography variant="body1" className={classes.balance}>
                        {formatReserve(reserves[0], coin1.symbol)}
                    </Typography>
                    <Typography variant="body1" className={classes.balance}>
                        {formatReserve(reserves[1], coin2.symbol)}
                    </Typography>
                </div>
                <div>
                    {/* 소유 LP토큰 양 */}
                    <Typography className={classes.text}>My LP Tokens</Typography>
                    <Typography variant="body1" className={classes.balance}>
                        {formatReserve(liquidityTokens, " ")}
                    </Typography>
                </div>
            </div>

            <Grid container direction="column" alignItems="center" spacing={2}>
                <LoadingButton
                    loading={loading}
                    valid={isButtonEnabled()}
                    success={false}
                    fail={false}
                    onClick={callAddLiquidity}
                >
                <AccountBalanceIcon className={classes.buttonIcon} />
                    Add Liquidity
                </LoadingButton>
            </Grid>
        </div>
    )
}

export default AddLiquidity;