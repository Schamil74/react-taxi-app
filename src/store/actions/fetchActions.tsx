import {
    IIsErrorType,
    SetIsErrorActionType,
    SetIsFetcingActionType,
    SET_IS_ERROR,
    SET_IS_FETCHING,
} from '../types/fetchTypes'

export const setIsFetching = (isFetching: boolean): SetIsFetcingActionType => {
    return { type: SET_IS_FETCHING, isFetching }
}

export const setIsError = (isError: IIsErrorType): SetIsErrorActionType => {
    return { type: SET_IS_ERROR, isError }
}
