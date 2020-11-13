export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const SET_IS_ERROR = 'SET_IS_ERROR'

export interface IIsErrorType {
    error: boolean
    msg: string
}

export type IISFetching = boolean

export interface IFetchErrorType {
    isFetching: IISFetching
    isError: IIsErrorType
}

export interface SetIsFetcingActionType {
    type: typeof SET_IS_FETCHING
    isFetching: IISFetching
}

export interface SetIsErrorActionType {
    type: typeof SET_IS_ERROR
    isError: IIsErrorType
}

export type FetchErrorActionTypes =
    | SetIsFetcingActionType
    | SetIsErrorActionType

export type FetchErrorTypeConstTypes =
    | typeof SET_IS_FETCHING
    | typeof SET_IS_ERROR
