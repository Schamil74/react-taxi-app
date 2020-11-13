import {
    Avatar,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core'
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './store/types'
import { TCrewItem } from './store/types/crewMapTypes'

type TCrew = {
    crewItems: any
}
const Crews: FC<TCrew> = props => {
    const { crewItems } = props
    const fetchReducer = (state: RootState) => state.fetchReducer
    const { isFetching } = useSelector(fetchReducer)
    if (!crewItems.length) {
        return null
    }
    return (
        <List>
            {crewItems.map((cr: TCrewItem, ndx: string) => (
                <React.Fragment key={ndx}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            {isFetching ? (
                                <CircularProgress size={40} />
                            ) : (
                                <Avatar>
                                    <LocalTaxiIcon />
                                </Avatar>
                            )}
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${cr.car_mark} ${cr.car_model}`}
                            secondary={`Цвет: ${cr.car_color},  Номер: ${cr.car_number}`}
                        />
                    </ListItem>
                    <Divider component="li" />
                </React.Fragment>
            ))}
        </List>
    )
}

export default Crews
