import { createStackNavigator, createAppContainer } from "react-navigation";
import ExploreScreen from "./ExploreScreen"
import CreateHeanScreen from "./CreateHeanScreen"

const ExploreScreenNavigator = createStackNavigator(
    {
        Explore: { screen: ExploreScreen },
        CreateHean: { screen: CreateHeanScreen },
    },
    {
        initialRouteName: "Explore"
    }
);

export default createAppContainer(ExploreScreenNavigator);