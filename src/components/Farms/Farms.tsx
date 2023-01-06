import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

import StakeDialog from "./StakeDialog";
import BigNumber from "bignumber.js";
import { BIG_TEN } from "../../utils/bigNumber";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: 0,
    position: "relative",
  },
  coinList: {
    height: "300px",
    overflowY: "scroll",
  },
}));

export default function FarmList(props: any) {
  const classes = useStyles();

  const columns: GridColDef[] = [

    { field: "pid", headerName: "PID", width: 70, headerAlign: 'center', align: 'center' },
    { field: "lpSymbol", headerName: "Pool", width: 200, headerAlign: 'center', align: 'center' },
    { field: "tvl", headerName: "TVL", width: 150, headerAlign: 'center', align: 'center' },
    { field: "apr", headerName: "APR", width: 150, headerAlign: 'center', align: 'center' },
    { field: "multiplier", headerName: "Multiplier", width: 150, headerAlign: 'center', align: 'center' },
    { field: "deposited", headerName: "My Staking", width: 150, headerAlign: 'center', align: 'center' },
    { field: "earning", headerName: "My Claimable", width: 170, headerAlign: 'center', align: 'center' },
    {
      field: 'Staking',
      headerName: 'Action',
      width: 200,
      headerAlign: 'center', align: 'center',
      sortable: false,
      renderCell: (params: any) => {

        const openStakeDialog = (e: any) => {
          console.log(params);
          setStakePid(params.row.pid);
          setStakeLPAddress(params.row.lpAddress);
          setStakeDialogOpen(true);
        };
        return <div>
          <Button onClick={openStakeDialog}>
            Stake
          </Button>
          <Button>
            UnStake
          </Button>
        </div>

      }
    }
  ]
  const { farms, userEarnings, userStaked, account, chainId } = props;
  const [stakeDialogOpen, setStakeDialogOpen] = React.useState(false);
  const [stakeLPAddress, setStakeLPAddress] = React.useState('');
  const [stakePid, setStakePid] = React.useState(0);
  let farmsWithUserData = [];
  const onDialogClose = () => {
    setStakeDialogOpen(false);
  }
  console.log(userStaked)
  if (farms && farms.length) {
    farmsWithUserData = farms.map((farm: any, index: any) => {
      return {
        ...farm,
        earning: new BigNumber(userEarnings[index]).div(BIG_TEN.pow(18)),
        deposited: new BigNumber(userStaked[index]).div(BIG_TEN.pow(18)),
      }
    })
  }
  
  return (
    <div className={classes.wrapper}>
      {/* Dialog Windows */}
      <StakeDialog
        onClose={onDialogClose}
        open={stakeDialogOpen}
        pid={stakePid}
        userAddress={account}
        lpAddress={stakeLPAddress}
        chainId={chainId}
      />
      {farms && farms.length && (
        <div style={{ height: 300, width: '100%' }} >
          <DataGrid rows={farmsWithUserData} columns={columns} getRowId={(row: any) => row.pid} />
        </div>
      )}



    </div>
  );
}
