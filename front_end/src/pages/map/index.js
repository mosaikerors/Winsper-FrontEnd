import { createStackNavigator } from "react-navigation";
import MapScreen from "./MapScreen";
import HeanDetailScreen from "../myinfo/Repository/HeanDetailScreen"

const MapScreenNavigator = createStackNavigator(
    {
        Map: { screen: MapScreen, navigationOptions: { header: null } },
        HeanDetail: { screen: HeanDetailScreen, navigationOptions: { title: "函" } },
    },
    {
        initialRouteName: "Map",
        navigationOptions: ({ navigation }) => {
            // topScreen: 当前页面
            const topScreen = navigation.state.routes[navigation.state.routes.length - 1].routeName;
            // 只有当前页面为 Map 时，才显示底部导航栏
            const tabBarVisible = (topScreen === "Map");
            return { tabBarVisible };
        }
    }
);

export default (MapScreenNavigator);