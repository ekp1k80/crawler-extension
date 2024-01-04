import React from 'react'
import Grid from '@mui/material/Grid/Grid'
import { blue } from '@mui/material/colors';

const MainLayout = (props) => {
  return (
		<Grid container spacing={2} alignItems={"center"} sx={{ width: '100vw', height: '100vh', backgroundColor: blue[900] }}>
      { props.children }
    </Grid>
  )
}

export default MainLayout