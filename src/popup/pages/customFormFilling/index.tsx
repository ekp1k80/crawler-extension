import React from 'react'
import MainLayout from '../../components/mainLayout'
import Grid from '@mui/material/Grid/Grid'
import Button from '@mui/material/Button/Button'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { useAppSelector } from '../../redux/hooks';
import { WSReactToContentScripts, ISocketMessage } from '../../../types/socketMessage';

const CustomFormFillingPage = () => {
  const ws = useAppSelector((state)  => state.mainReducer.ws)

  const handleButtonOnClick = () => {
    const message: ISocketMessage = {
      type: 'broadcast',
      data: {
        data: {
          type: 'normal-form-selector-pick-with-borderline'
        },
        type: WSReactToContentScripts
      }
    
    }
    ws.send(JSON.stringify(message))
    //window.close()
  }

    return ( 
      <MainLayout>
        <Grid item xs={4}></Grid>
			<Grid container item xs={4} justifyContent={"center"} alignItems={"center"}>
				<Button onClick={handleButtonOnClick} variant="outlined" startIcon={<HighlightAltIcon />}>
					Form Filling
				</Button>
			</Grid>
      </MainLayout>
    )
}

export default CustomFormFillingPage