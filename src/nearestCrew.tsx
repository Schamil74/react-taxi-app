import {
    Box,
    Card,
    CardHeader,
    CircularProgress,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import CallToActionIcon from '@material-ui/icons/CallToAction'
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './store/types'

type TNearestCrew = {
    nearestCrew: any
}

const NearestCrew: FC<TNearestCrew> = props => {
    const { nearestCrew } = props
    const fetchReducer = (state: RootState) => state.fetchReducer
    const { isFetching } = useSelector(fetchReducer)

    if (!nearestCrew) {
        return null
    }
    return (
        <Grid item xs={4}>
            <Box mb={5}>
                <Typography
                    align="left"
                    variant="h6"
                    component="h3"
                    gutterBottom
                >
                    Ближайший экипаж
                </Typography>
                <Card>
                    <CardHeader
                        avatar={
                            isFetching ? (
                                <CircularProgress size={40} />
                            ) : (
                                <Avatar color="primary">
                                    <LocalTaxiIcon color="primary" />
                                </Avatar>
                            )
                        }
                        action={
                            <IconButton aria-label="settings">
                                <CallToActionIcon color="primary" />
                            </IconButton>
                        }
                        title={`${nearestCrew.car_mark} ${nearestCrew.car_model}`}
                        subheader={`Цвет: ${nearestCrew.car_color},  Номер: ${nearestCrew.car_number}`}
                    />
                </Card>
            </Box>
        </Grid>
    )
}

export default NearestCrew
