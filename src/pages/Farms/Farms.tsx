import React, { useEffect, useState } from "react";
import FarmList from "../../components/Farms/Farms";

import {
    Theme,
    Container,
    makeStyles,
    createStyles,
    Paper,
    Typography,
} from "@material-ui/core";

import { fetchFarms } from "../../functions/farms/farms";
import { fetchFarmUserEarnings, fetchFarmUserStakedBalances } from "../../functions/farms/fetchFarmUser";
import { getFarmConfig } from "../../constants/farms";
import { getFarmManaRewardApr } from "../../functions/farms/apr";
import { REWARD_PER_BLOCK } from "../../constants";

const Farms = (props: any) => {
    const [farms, setFarms] = useState<any>();
    const [userEarnings, setUserEarnings] = useState<any>();
    const [userStaked, setUserStaked] = useState<any>();

    useEffect(() => {
        getFarmConfig(props.network).then((farmsToFetch) => {
            fetchFarms(farmsToFetch, props.network).then((farms) => {
                const farmsWithAPR = farms.map((farm: any, index: any) => {
                    return {
                        ...farm,
                        apr: getFarmManaRewardApr(farm, REWARD_PER_BLOCK) + '%'
                    }
                })
                setFarms(farmsWithAPR);
            })
            fetchFarmUserEarnings(props.account, farmsToFetch, props.network).then((earnings) => {
                setUserEarnings(earnings);
            })
            fetchFarmUserStakedBalances(props.account, farmsToFetch, props.network).then((staked) => {
                setUserStaked(staked);
            });
            
        })
    }, [props.account, props.network]);
    return (
        <Container>
            <FarmList farms={farms} userEarnings={userEarnings} userStaked={userStaked} account={props.account} chainId={props.network}/>
        </Container>

    )
}

export default Farms;