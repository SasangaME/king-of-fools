

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';
import './App.css'
// import AppRoutes from './components/AppRoutes';
import { styled } from '@mui/material/styles';
import { maxWidth } from '@mui/system';
import Home from './components/Home';

const AppContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#445179',
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: 'white',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  paddingLeft: 0,
  paddingRight: 0
}));

function App() {
  return (
    <AppContainer maxWidth>
      <Header maxWidth />
      {/* <AppRoutes maxWidth /> */}
      <Home />
    </AppContainer>
  );
}

export default App;
