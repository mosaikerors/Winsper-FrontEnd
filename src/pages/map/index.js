import { createStackNavigator } from "react-navigation";
import MapScreen from "./MapScreen";
import HeanDetailScreen from "../myinfo/Repository/HeanDetailScreen"
import PersonPageScreen from "../myinfo/PersonPageScreen"
import HeanListScreen from "../myinfo/Repository/HeanListScreen";
import CollectionScreen from "../myinfo/Repository/CollectionScreen";
import DiaryListScreen from "../myinfo/Repository/DiaryListScreen";
import DiaryDetailScreen from "../myinfo/Repository/DiaryDetailScreen";
import JournalListScreen from "../myinfo/Repository/JournalListScreen";
import JournalDetailScreen from "../myinfo/Repository/JournalDetailScreen";
import SubmissionScreen from "../myinfo/Repository/SubmissionScreen";
import MoodReportScreen from "../myinfo/Repository/MoodReportScreen";
import MoodReportDetailScreen from "../myinfo/Repository/MoodReportDetailScreen";
import CommentScreen from "../myinfo/Repository/CommentScreen";
import PostSubmissionScreen from "../explore/PostSubmissionScreen"
import SelectHeanScreen from "../explore/SelectHeanScreen"
import theme from "../../theme"

const MapScreenNavigator = createStackNavigator(
    {
        Map: { screen: MapScreen, navigationOptions: { header: null } },
        HeanDetail: { screen: HeanDetailScreen, navigationOptions: { title: "函" } },
        PersonPage: { screen: PersonPageScreen, navigationOptions: { title: '个人主页' } },
        HeanList: { screen: HeanListScreen, navigationOptions: { title: '函' } },
        HeanDetail: { screen: HeanDetailScreen, navigationOptions: { title: '函' } },
        Collection: { screen: CollectionScreen, navigationOptions: { title: '收藏' } },
        DiaryList: { screen: DiaryListScreen, navigationOptions: { title: '日记' } },
        DiaryDetail: { screen: DiaryDetailScreen, navigationOptions: { title: '日记' } },
        JournalList: { screen: JournalListScreen, navigationOptions: { title: '手账' } },
        JournalDetail: { screen: JournalDetailScreen, navigationOptions: { header: null } },
        Submission: { screen: SubmissionScreen, navigationOptions: { title: '投稿' } },
        PostSubmission: { screen: PostSubmissionScreen, navigationOptions: { title: '投稿' } },
        SelectHean: { screen: SelectHeanScreen, navigationOptions: { title: '选择函' } },
        MoodReport: { screen: MoodReportScreen, navigationOptions: { title: '心情报表' } },
        MoodReportDetail: { screen: MoodReportDetailScreen, navigationOptions: { header: null }  },
        Comment: { screen: CommentScreen, navigationOptions: { title: '评论' } },
    },
    {
        initialRouteName: "Map",
        defaultNavigationOptions: {
            headerStyle: { backgroundColor: theme.palette.sky[1], },
            //headerTintColor: 'black',
        },
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