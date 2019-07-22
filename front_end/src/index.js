import React from 'react'
import { Provider } from 'react-redux'
import Home from './pages/Home'
import Loading from './components/Loading'
import { store, persistor } from './store/index'
import { PersistGate } from 'redux-persist/lib/integration/react'

console.disableYellowBox = true;  //don't show any warning

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<Loading />} persistor={persistor}>
                    <Home />
                </PersistGate>
            </Provider>
        )
    }
}