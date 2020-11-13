export const SET_IS_ADDRESS = 'SET_IS_ADDRESS'
export const SET_IS_CREW = 'SET_IS_CREW'
export const SET_IS_TRIGGER_AUTOCOMPLETE = 'SET_IS_TRIGGER_AUTOCOMPLETE'
export const SET_IS_TRIGGER_MAP = 'SET_IS_TRIGGER_MAP'
export const SET_IS_CLEAR_CREW = 'SET_IS_CLEAR_CREW'
export const SET_IS_CREWSPLACEMARKS = 'SET_IS_CREWSPLACEMARKS'
export const SET_IS_CLEAR_CREWSPLACEMARKS = 'SET_IS_CLEAR_CREWSPLACEMARKS'

export interface TObjectType {
    [key: string]: any
}

export type TAddress = TObjectType | null | string

export type TCrew = {
    code: number
    descr: string
    data: {
        crews_info: Array<TCrewItem>
    }
}

export type TCrewItem = {
    'crew_id': number
    'car_mark': string
    'car_model': string
    'car_color': string
    'car_number': string
    'driver_name': string
    'driver_phone': string
    'lat': number
    'lon': number
    'distance': number
}

export interface ICrewMapType {
    mapState: {
        center: Array<number>
        zoom: number
    }
    city: string
    address: TAddress
    triggerAutoComplete: boolean
    triggerMap: boolean
    crewsPlacemarks: Array<TObjectType>
    crew: TCrew
}

export interface SetIsAddressActionType {
    type: typeof SET_IS_ADDRESS
    address: TAddress
}

export interface SetIsTriggerAutoCompleteActionType {
    type: typeof SET_IS_TRIGGER_AUTOCOMPLETE
}

export interface SetIsTriggerMapActionType {
    type: typeof SET_IS_TRIGGER_MAP
}

export interface SetIsCrewActionType {
    type: typeof SET_IS_CREW
    crew: TCrew
}

export interface SetIsCrewsPlacemarksActionType {
    type: typeof SET_IS_CREWSPLACEMARKS
    crewsPlacemarks: Array<TObjectType>
}

export interface SetIsClearCrewsPlacemarksActionType {
    type: typeof SET_IS_CLEAR_CREWSPLACEMARKS
}

export interface SetIsClearCrewActionType {
    type: typeof SET_IS_CLEAR_CREW
}

export type CrewMapTypes =
    | SetIsAddressActionType
    | SetIsCrewActionType
    | SetIsTriggerMapActionType
    | SetIsTriggerAutoCompleteActionType
    | SetIsClearCrewActionType
    | SetIsCrewsPlacemarksActionType
    | SetIsClearCrewsPlacemarksActionType

export type CrewMapTypesName =
    | typeof SET_IS_ADDRESS
    | typeof SET_IS_CREW
    | typeof SET_IS_TRIGGER_AUTOCOMPLETE
    | typeof SET_IS_TRIGGER_MAP
    | typeof SET_IS_CREWSPLACEMARKS
    | typeof SET_IS_CLEAR_CREWSPLACEMARKS
