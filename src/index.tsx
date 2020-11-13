import 'fontsource-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './store/reducers'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
            <App />
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
)
