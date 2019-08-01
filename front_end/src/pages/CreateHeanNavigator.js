import { createStackNavigator } from "react-navigation";
import CreateHeanScreen from "./explore/CreateHeanScreen"
import CreateJournalScreen from "./explore/CreateJournalScreen"

const CreateHeanNavigator = createStackNavigator(
    {
        //CreateJournal: { screen: CreateJournalScreen, navigationOptions: { title: "写函" } },
        CreateHean: { screen: CreateHeanScreen, navigationOptions: { title: "写函" } },
    },
    {
        initialRouteName: "CreateHean",
        navigationOptions: {
            tabBarVisible: false
        }
    }
);

export default (CreateHeanNavigator);