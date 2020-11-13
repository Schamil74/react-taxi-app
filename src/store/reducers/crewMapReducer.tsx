import {
    CrewMapTypes,
    ICrewMapType,
    SET_IS_ADDRESS,
    SET_IS_CLEAR_CREW,
    SET_IS_CLEAR_CREWSPLACEMARKS,
    SET_IS_CREW,
    SET_IS_CREWSPLACEMARKS,
    SET_IS_TRIGGER_AUTOCOMPLETE,
    SET_IS_TRIGGER_MAP,
} from '../types/crewMapTypes'

const initialState: ICrewMapType = {
    mapState: {
        center: [56.84974515644635, 53.2123625371093],
        zoom: 12,
    },
    city: 'Ижевск',
    address: '',
    triggerAutoComplete: false,
    triggerMap: false,
    crewsPlacemarks: [],
    crew: {
        code: 0,
        descr: '',
        data: {
            crews_info: [],
        },
    },
}

export function crewMapReducer(
    state = initialState,
    action: CrewMapTypes
): ICrewMapType {
    switch (action.type) {
        case SET_IS_ADDRESS:
            return {
                ...state,
                address: action.address,
            }

        case SET_IS_TRIGGER_AUTOCOMPLETE:
            return {
                ...state,
                triggerAutoComplete: !state.triggerAutoComplete,
            }
        case SET_IS_TRIGGER_MAP:
            return {
                ...state,
                triggerMap: !state.triggerMap,
            }

        case SET_IS_CREW:
            return {
                ...state,
                crew: {
                    ...state.crew,
                    ...action.crew,
                },
            }
        case SET_IS_CREWSPLACEMARKS:
            return {
                ...state,
                crewsPlacemarks: [...action.crewsPlacemarks],
            }
        case SET_IS_CLEAR_CREWSPLACEMARKS:
            return {
                ...state,
                crewsPlacemarks: [],
            }
        case SET_IS_CLEAR_CREW:
            return {
                ...state,
                crew: {
                    code: 0,
                    descr: '',
                    data: {
                        crews_info: [],
                    },
                },
            }

        default:
            return state
    }
}
