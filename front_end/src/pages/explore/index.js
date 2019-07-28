import { createStackNavigator } from "react-navigation";
import ExploreScreen from "./ExploreScreen"
import CreateHeanScreen from "./CreateHeanScreen"
import CreateJournalScreen from "./CreateJournalScreen"

const ExploreScreenNavigator = createStackNavigator(
    {
        Explore: { screen: ExploreScreen },
        CreateHean: { screen: CreateHeanScreen, navigationOptions: { title: '写函' } },
        // CreateJournal 页面不显示页眉
        CreateJournal: { screen: CreateJournalScreen, navigationOptions: { header: null } }
    },
    {
        initialRouteName: "Explore",
        navigationOptions: ({ navigation }) => {
            // topScreen: 当前页面
            const topScreen = navigation.state.routes[navigation.state.routes.length - 1].routeName;
            // 只有当前页面为 Explore 时，才显示底部导航栏
            const tabBarVisible = (topScreen === "Explore");
            return { tabBarVisible };
        }
    }
);

export default (ExploreScreenNavigator);