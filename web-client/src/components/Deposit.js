import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
    FormControl, FormHelperText, TextField,
    Button
} from '@mui/material'
import { depositEth } from '../integration/web3connector';

const Deposit = () => {
    const [amount, setAmount] = useState(0);

    const submitHandler = (event) => {
        event.preventDefault();
        (async () => {
            await depositEth(amount);
            setAmount(0);
        })();
    }

    const depositUSDC = () => {
        alert("USDC: " + amount);
    }

    return (
        <div>
            <br /> <br />
            <Typography variant='h4'>Deposit</Typography>
            <br /> <br />
            <form onSubmit={submitHandler}>
                <FormControl sx={{
                    width: '10vw'
                }}>
                    <label>Amount</label>
                    <TextField id="outlined-basic" variant="standard"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                        type="number" sx={{ input: { color: 'white' } }} />
                    {/* <FormHelperText>
                        <Typography color='red' component="div">{amountErr}</Typography>
                    </FormHelperText> */}
                </FormControl> &nbsp;  &nbsp; < br /> <br />
                <Button variant="contained" color="primary" type='submit'>Deposit ETH</Button>
                &nbsp; &nbsp;
                <Button variant="contained" color="primary" onClick={depositUSDC}>Deposit USDC</Button>
            </form >
        </div >
    )
}

export default Deposit