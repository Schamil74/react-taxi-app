import {
    FetchErrorActionTypes,
    IFetchErrorType,
    SET_IS_ERROR,
    SET_IS_FETCHING,
} from '../types/fetchTypes'

const initialState: IFetchErrorType = {
    isFetching: false,
    isError: {
        error: false,
        msg: '',
    },
}

export function fetchReducer(
    state = initialState,
    action: FetchErrorActionTypes
): IFetchErrorType {
    switch (action.type) {
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }

        case SET_IS_ERROR:
            return {
                ...state,
                isError: {
                    error: action.isError.error,
                    msg: action.isError.msg,
                },
            }

        default:
            return state
    }
}
