import { createStackNavigator, createAppContainer } from "react-navigation";
import InitialScreen from "./InitialScreen"
import FollowingScreen from "./FollowingScreen"

const MyInfoScreen = createStackNavigator(
    {
        Initial: { screen: InitialScreen },
        Following: { screen: FollowingScreen }
    },
    {
        initialRouteName: 'Initial'
    }
);

export default createAppContainer(MyInfoScreen);