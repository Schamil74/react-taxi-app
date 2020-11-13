import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { crewMapReducer } from './crewMapReducer'
import { fetchReducer } from './fetchReducer'

export const rootReducer = combineReducers({
    fetchReducer,
    crewMapReducer,
})

let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export { store }
