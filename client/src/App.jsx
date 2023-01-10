import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import LoginPage from './scenes/loginPage/index';
import HomePage from './scenes/homePage/index';
import ProfilePage from './scenes/profilePage/index'
import { themeSettings } from './theme'


function App() {

  const mode = useSelector(state => state.mode)
  
  const theme = useMemo(() => {
    return createTheme(themeSettings(mode))
  }, [mode])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
