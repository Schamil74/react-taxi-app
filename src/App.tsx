import {
    Box,
    Button,
    Container,
    CssBaseline,
    Dialog,
    DialogTitle,
    Grid,
    Typography,
} from '@material-ui/core'
import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Crews from './crews'
import SiteMap from './map'
import NearestCrew from './nearestCrew'
import Search from './search'
import { RootState } from './store/types'

function App() {
    const crewMapReducer = (state: RootState) => state.crewMapReducer
    const [isValid, setIsValid] = useState<boolean>(false)
    const { crewsPlacemarks, address } = useSelector(crewMapReducer)
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
        setOpen(false)
        setIsValid(false)
    }

    const onOrder = async () => {
        if (!address) {
            setOpen(true)
            return false
        }

        const { crew_id, lat, lon } = crewsPlacemarks[0]

        const data = {
            'source_time': new Date()
                .toISOString()
                .slice(-24)
                .replace(/\D/g, '')
                .slice(0, 14),
            'addresses': [
                {
                    address:
                        address && typeof address === 'object' && address.name,
                    lat,
                    lon,
                },
            ],
            crew_id,
        }

        const res = await Axios.post('https://httpbin.org/post', data)

        alert('Отправленные данные: ' + JSON.stringify(res.data.data))
    }

    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
        >
            <CssBaseline />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Пожалуйста, укажите адрес или выберите его на карте'}
                </DialogTitle>
            </Dialog>
            <Container maxWidth="lg">
                <Box mb={3}>
                    <Typography
                        align="center"
                        variant="h4"
                        component="h1"
                        gutterBottom
                    >
                        Детали заказа
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box mb={3}>
                            <Search isValid={isValid} />
                        </Box>
                    </Grid>

                    <NearestCrew nearestCrew={crewsPlacemarks[0]} />
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <SiteMap />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography
                            align="left"
                            variant="h6"
                            component="h2"
                            gutterBottom
                        >
                            Доступные авто
                        </Typography>
                        <Crews crewItems={crewsPlacemarks} />
                    </Grid>
                </Grid>
                <Box
                    mt={5}
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onOrder}
                    >
                        Заказать
                    </Button>
                </Box>
            </Container>
        </Box>
    )
}

export default App
