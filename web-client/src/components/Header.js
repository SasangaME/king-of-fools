import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';
import { connectAccounts, mintTokens } from "../integration/web3connector";

const Header = () => {

    const mint = () => {
        (async () => {
            await mintTokens();
        })();
    }

    const connectWallet = () => {
        (async () => {
            await connectAccounts();
        })();
    }

    return (
        <Box sx={{ flexGrow: 1 }} maxWidth>
            <AppBar position="static" style={{ background: 'black' }} maxWidth>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        King of the Fools
                    </Typography>
                    <Button color="inherit" onClick={mint}>Mint Tokens</Button>
                    <Button color="inherit" onClick={connectWallet}>Connect Wallet</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header