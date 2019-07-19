import { createStackNavigator, createAppContainer } from "react-navigation";
import ExploreScreen from "./ExploreScreen"
import CreateHeanScreen from "./CreateHeanScreen"
import CreateJournalScreen from "./CreateJournalScreen"

const ExploreScreenNavigator = createStackNavigator(
    {
        Explore: { screen: ExploreScreen },
        CreateHean: { screen: CreateHeanScreen },
        CreateJournal: { screen: CreateJournalScreen, navigationOptions: { header: null } }
    },
    {
        initialRouteName: "Explore",
        navigationOptions: ({ navigation }) => {
            const topScreen = navigation.state.routes[navigation.state.routes.length - 1].routeName;
            const tabBarVisible = (topScreen === "Explore") ? true : false;
            return { tabBarVisible };
        }
    }
);

export default (ExploreScreenNavigator);