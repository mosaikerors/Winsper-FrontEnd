import React from 'react'
import Footer from './Footer'
import VisibleTodoList from '../containers/VisibleTodoList'
import {View} from 'react-native'

const App = () => (
  <View>
    <VisibleTodoList />
    <Footer />
  </View>
);

export default App
