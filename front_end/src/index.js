import React from 'react'
import { Provider } from 'react-redux'
import Home from './pages/Home'
import store from './store/index'

export default class Root extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Home />
            </Provider>
        )
    }
}