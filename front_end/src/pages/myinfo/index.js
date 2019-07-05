import { createStackNavigator, createAppContainer } from "react-navigation";
import InitialScreen from "./InitialScreen"
import FollowingScreen from "./FollowingScreen"
import FollowersScreen from "./FollowersScreen"
import MutualFollowScreen from "./MutualFollowScreen";

const MyInfoScreen = createStackNavigator(
    {
        Initial: { screen: InitialScreen },
        Following: { screen: FollowingScreen },
        Followers: { screen: FollowersScreen },
        MutualFollow: {screen: MutualFollowScreen}
    },
    {
        initialRouteName: 'Initial'
    }
);

export default createAppContainer(MyInfoScreen);