import axios from 'axios'
import { AppThunkAction } from '../types'
import {
    SetIsAddressActionType,
    SetIsClearCrewActionType,
    SetIsClearCrewsPlacemarksActionType,
    SetIsCrewActionType,
    SetIsCrewsPlacemarksActionType,
    SetIsTriggerAutoCompleteActionType,
    SetIsTriggerMapActionType,
    SET_IS_ADDRESS,
    SET_IS_CLEAR_CREW,
    SET_IS_CLEAR_CREWSPLACEMARKS,
    SET_IS_CREW,
    SET_IS_CREWSPLACEMARKS,
    SET_IS_TRIGGER_AUTOCOMPLETE,
    SET_IS_TRIGGER_MAP,
    TAddress,
    TCrew,
    TCrewItem,
    TObjectType,
} from '../types/crewMapTypes'
import { setIsError, setIsFetching } from './fetchActions'

const sortCrews = (itemA: TCrewItem, itemB: TCrewItem) => {
    return itemA.distance - itemB.distance
}

export const thunkSetCrew = (): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        const response = await axios.get(
            'https://run.mocky.io/v3/8e29fca5-b8e2-40d5-94b7-12f694d5d735'
        )

        const sorted = response.data.data.crews_info.sort(sortCrews)

        const data = {
            ...response.data,
            data: {
                crews_info: sorted,
            },
        }

        dispatch(setCrew(data))
        dispatch(setIsFetching(false))
    } catch (error) {
        dispatch(setIsFetching(false))
        dispatch(setIsError(error))
    }
}

export const setCrew = (crew: TCrew): SetIsCrewActionType => {
    return { type: SET_IS_CREW, crew }
}

export const setCrewPlacemarks = (
    crewsPlacemarks: Array<TObjectType>
): SetIsCrewsPlacemarksActionType => {
    return { type: SET_IS_CREWSPLACEMARKS, crewsPlacemarks }
}

export const setClearCrewPlacemarks = (): SetIsClearCrewsPlacemarksActionType => {
    return { type: SET_IS_CLEAR_CREWSPLACEMARKS }
}

export const setClearCrew = (): SetIsClearCrewActionType => {
    return { type: SET_IS_CLEAR_CREW }
}

export const setAddress = (address: TAddress): SetIsAddressActionType => {
    return { type: SET_IS_ADDRESS, address }
}

export const setTriggerAutoComplete = (): SetIsTriggerAutoCompleteActionType => {
    return { type: SET_IS_TRIGGER_AUTOCOMPLETE }
}

export const setTriggerMap = (): SetIsTriggerMapActionType => {
    return { type: SET_IS_TRIGGER_MAP }
}
