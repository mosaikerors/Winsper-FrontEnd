import { createStackNavigator } from "react-navigation";
import LoggedInScreen from "./LoggedInScreen"
import PersonPageScreen from "./PersonPageScreen"
import FollowScreen from "./FollowScreen";
import MessageListScreen from "./Repository/MessageListScreen";
import MessageDetailScreen from "./Repository/MessageDetailScreen";
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
        LoggedOut: { screen: LoggedOutScreen, navigationOptions: { header: null } },
        LoggedIn: { screen: LoggedInScreen, navigationOptions: { title: '我的' } },
        PersonPage: { screen: PersonPageScreen, navigationOptions: { title: '个人主页' } },
        Follow: { screen: FollowScreen, navigationOptions: { title: '关注列表' } },
        MessageList: { screen: MessageListScreen, navigationOptions: { title: '消息列表' } },
        MessageDetail: { screen: MessageDetailScreen, navigationOptions: { title: '消息' } },
        HeanList: { screen: HeanListScreen, navigationOptions: { title: '我的函' } },
        HeanDetail: { screen: HeanDetailScreen, navigationOptions: { title: '函' } },
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