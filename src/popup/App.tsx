import React from 'react'
import './App.css';
import { useState } from 'react';
import { pageConstants } from './navigator/constants';
import { useSelector } from 'react-redux';
import { navigator } from './navigator'
import { useAppSelector } from './redux/hooks';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    background: {
      default: blue[900],
    },
    primary: {
      main: '#fff'
    }
  }
})

function App() {
  const page = useAppSelector((state)  => state.mainReducer.page)

  console.log("state page")
  console.log(page)
  const RenderPage = navigator[page]

  // @ts-ignore
  return (
    <ThemeProvider theme={theme}>
      <RenderPage/>
    </ThemeProvider>
  )
}

export default App;
