import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import { Theme, makeStyles, createStyles, Container, Box, Button, Popover, Typography } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

import { useWeb3React } from '@web3-react/core';
import { injected } from './connectors';

import NavBar from './components/Navbar/NavBar';
import Swap from './pages/Swap/Swap';
import Liquidity from './pages/Liquidity/Liquidity';
import Farms from './pages/Farms/Farms';

import logo from './assets/logo_white.png';

const styles = (theme: Theme) => createStyles({
  Container: {
    background: '#e7fbff',
    padding: theme.spacing(2),
    maxWidth: '100%',
    margin: "auto",
  },
  Button :{
    background: '#71e4ed',
    color: 'white',
  },
});
const useStyles = makeStyles(styles);

function App() {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const {
    chainId, //어떤 이더리움 네트워크인지
    account,
    active,
    activate,
    deactivate
  } = useWeb3React(); //이더리움과 연결된 상태정보 가져옴


  function handleConnect() {
    if (active) {
      deactivate();
      return;
    }

    activate(injected, (error) => { //어떤 네트워크를 서포트 하는지
      if (error) {
        window.open('https://metamask.io/download.html');
      }
    })
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft :100, paddingRight:100}}>
        <img src={logo}/>
        {account? (
          <div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick} className={classes.Button}>
              <AccountBalanceWalletOutlinedIcon />
              <Typography>{account.substring(0,4)} ... {account.substring(account.length - 4)}</Typography>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Container maxWidth="sm" className={classes.Container}>
                <Box><b>Account</b> <br/> {account}</Box>
                <Box><b>ChainId</b> <br/> {chainId} ( Goerli Testnet )</Box>
                <Button style={{marginTop:20}} onClick={handleConnect} className={classes.Button}>{active ? 'DisConnect' : 'Connect'}</Button>
              </Container>
            </Popover>
          </div>
        ):(
          <div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
              <AccountBalanceWalletOutlinedIcon />
              <Typography>Connect MetaMask</Typography>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Container maxWidth="sm" className={classes.Container}>
                <Button onClick={handleConnect} className={classes.Button}>{active ? 'DisConnect' : 'Connect'}</Button>
              </Container>
            </Popover>
        </div>
        )}
      </div>

      <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Swap account={account} network={chainId} />} ></Route>
          <Route path="/liquidity" element={<Liquidity account={account} network={chainId} />} ></Route>
          <Route path="/farms" element={<Farms account={account} network={chainId} />} ></Route>
        </Routes>
      </BrowserRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;
