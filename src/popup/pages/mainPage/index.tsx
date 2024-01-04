import React from 'react'
import Grid from '@mui/material/Grid/Grid'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Button from '@mui/material/Button';
import MainLayout from '../../components/mainLayout'
import { setPage } from '../../redux/reducers/main'
import { pageConstants } from '../../navigator/constants';
import { useDispatch } from 'react-redux'

const MainPage = () => {
	const dispatch = useDispatch()

	const handleButtonOnClick = () => {
		dispatch(setPage(pageConstants.customFormFilling))
	}

	return (
		<MainLayout>
			<Grid item xs={4}></Grid>
			<Grid container item xs={4} justifyContent={"center"} alignItems={"center"}>
				<Button onClick={handleButtonOnClick} variant="outlined" startIcon={<FormatListBulletedIcon />}>
					Form Filling
				</Button>
			</Grid>
		</MainLayout>
			
	)
}

export default MainPage