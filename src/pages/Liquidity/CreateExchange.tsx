import { ChangeEvent, useState } from "react";
import { Button, makeStyles, TextField, Grid } from "@material-ui/core";
import { getFactoryContract } from "../../utils/ether";

const useStyles = makeStyles((theme) => ({ }));

const CreateExchange = (props: any) => {
    const classes = useStyles();

    const [newExchangeToken, setNewExchangeTokenInput] = useState<string>('');

    const handleNewExchangeTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewExchangeTokenInput(event.target.value);
    }

    const handleCreateExchange = async () => {
        //typechain 안 쓰면 기존에는 이런 식으로 함수 불러와 작성해야 했음
        //const response = await mintContract.methods.getNFT(account).call();
        //typechain 사용해서 간편하게
        console.log(`create exchange 실행 시킬 토큰 주소 : ${newExchangeToken}`)
        getFactoryContract(props.network).createExchange(newExchangeToken); 
    }

    return (
        <div style={{width:'100%', marginBottom:'50px'}}>
            <Grid container direction="row" justifyContent="space-between">
                <Grid item style={{width:'60%'}}>
                    <TextField fullWidth label="TokenAddress" onChange={handleNewExchangeTokenChange} />
                </Grid>
                <Grid item>
                    <Button style={{background:"#71e4ed", color:'white', fontWeight:'bold'}} variant="contained" onClick={handleCreateExchange}>Create Exchange</Button>
                </Grid>
            </Grid>
        </div>

    )

}

export default CreateExchange;