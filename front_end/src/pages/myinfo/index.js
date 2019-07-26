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
import AccountInfoScreen from "./Settings/AccountInfoScreen"
import PrivacySafetyScreen from "./Settings/PrivacySafetyScreen"

const MyInfoScreenNavigator = createStackNavigator(
    {
        LoggedOut: { screen: LoggedOutScreen },
        LoggedIn: { screen: LoggedInScreen },
        Following: { screen: FollowingScreen },
        Followers: { screen: FollowersScreen },
        MutualFollow: { screen: MutualFollowScreen },
        Message: { screen: MessageScreen },
        HeanList: { screen: HeanListScreen },
        HeanDetail: { screen: HeanDetailScreen },
        Collection: { screen: CollectionScreen },
        Diary: { screen: DiaryScreen },
        Journal: { screen: JournalScreen },
        Submission: { screen: SubmissionScreen },
        MoodReport: { screen: MoodReportScreen },
        Comment: { screen: CommentScreen },
        Settings: { screen: SettingsScreen, navigationOptions: { title: '设置' } },
        AccountInfo: { screen: AccountInfoScreen, navigationOptions: { title: '账号信息' } },
        PrivacySafety: { screen: PrivacySafetyScreen, navigationOptions: { title: '隐私与安全' } }
    },
    {
        //initialRouteName: "LoggedOut",
        initialRouteName: "LoggedIn",
        //headerMode: 'none',   // 是否显示页眉
        navigationOptions: ({ navigation }) => {
            // topScreen: 当前页面
            const topScreen = navigation.state.routes[navigation.state.routes.length - 1].routeName;
            // 只有当前页面为 LoggedIn 时，才显示底部导航栏
            const tabBarVisible = (topScreen === "LoggedIn");
            return { tabBarVisible };
        }
    }
);

export default (MyInfoScreenNavigator);