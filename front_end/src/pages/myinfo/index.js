import { createStackNavigator } from "react-navigation";
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
        initialRouteName: "LoggedIn",
        headerMode: 'none',
    }
);

MyInfoScreenNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    const topScreen = navigation.state.routes[navigation.state.routes.length - 1].routeName;
    if (topScreen === "LoggedOut") {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default (MyInfoScreenNavigator);