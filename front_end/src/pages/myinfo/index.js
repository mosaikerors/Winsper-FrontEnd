import { createStackNavigator, createAppContainer } from "react-navigation";
import LoggedInScreen from "./LoggedInScreen"
import FollowingScreen from "./Follow/FollowingScreen"
import FollowersScreen from "./Follow/FollowersScreen"
import MutualFollowScreen from "./Follow/MutualFollowScreen";
import MessageScreen from "./Repository/MessageScreen";
import HeanListScreen from "./Repository/HeanListScreen";
import CollectionScreen from "./Repository/CollectionScreen";
import DiaryScreen from "./Repository/DiaryScreen";
import JournalScreen from "./Repository/JournalScreen";
import SubmissionScreen from "./Repository/SubmissionScreen";
import MoodReportScreen from "./Repository/MoodReportScreen";
import CommentScreen from "./Repository/CommentScreen";
import LoggedOutScreen from "./LoggedOutScreen"
import SettingsScreen from "./Settings/SettingsScreen"
import HeanDetailScreen from "./Repository/HeanDetailScreen"
import AccountSafetyScreen from "./Settings/AccountSafetyScreen"

const MyInfoScreenNavigator = createStackNavigator(
    {
        LoggedOut: { screen: LoggedOutScreen },
        LoggedIn: { screen: LoggedInScreen },
        Following: { screen: FollowingScreen },
        Followers: { screen: FollowersScreen },
        MutualFollow: { screen: MutualFollowScreen },
        Message: { screen: MessageScreen },
        HeanList: { screen: HeanListScreen },
        Collection: { screen: CollectionScreen },
        Diary: { screen: DiaryScreen },
        Journal: { screen: JournalScreen },
        Submission: { screen: SubmissionScreen },
        MoodReport: { screen: MoodReportScreen },
        Comment: { screen: CommentScreen },
        Settings: { screen: SettingsScreen },
        AccountSafety: { screen: AccountSafetyScreen },
        HeanDetail: { screen: HeanDetailScreen }
    },
    {
        initialRouteName: "LoggedOut",
        headerMode: 'none',   //是否显示页眉
        navigationOptions: ({ navigation }) => {
            const topScreen = navigation.state.routes[navigation.state.routes.length - 1].routeName;
            const tabBarVisible = (topScreen === "LoggedIn") ? true : false;
            return { tabBarVisible };
        }
    }
);

export default (MyInfoScreenNavigator);