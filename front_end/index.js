import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/index'
//import App from "./App2"

AppRegistry.registerComponent(appName,()=>App);