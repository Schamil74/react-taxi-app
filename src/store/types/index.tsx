import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { rootReducer } from '../reducers'
import { CrewMapTypes, CrewMapTypesName } from './crewMapTypes'
import { FetchErrorActionTypes, FetchErrorTypeConstTypes } from './fetchTypes'

type ActionTypes = FetchErrorActionTypes | CrewMapTypes

type ActionConstTypes = FetchErrorTypeConstTypes | CrewMapTypesName

export type RootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<
    RootState,
    any,
    Action<ActionTypes>
>

export type AppThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<ActionConstTypes>
>
