import React, { useEffect } from 'react'
import { connectAccounts } from "../integration/web3connector"
import Deposit from './Deposit';

const Home = () => {
    useEffect(() => {
        (async () => {
            // alert("test123")
            connectAccounts();
            // const address = await getMyAccount();
            // setAddress(address);
            // const balance = await getAccountBalance();
            // setAccountBalance(balance);
        })();
    }, []);
    return (
        <Deposit />
    )
}

export default Home