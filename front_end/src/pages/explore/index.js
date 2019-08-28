import { createStackNavigator } from "react-navigation";
import ExploreScreen from "./ExploreScreen"
import CreateHeanScreen from "./CreateHeanScreen"
import CreateJournalScreen from "./CreateJournalScreen"
import CreateDiaryScreen from "./CreateDiaryScreen"
import PostSubmissionScreen from "./PostSubmissionScreen"
import SelectHeanScreen from "./SelectHeanScreen"
import SubmissionScreen from "../../pages/myinfo/Repository/SubmissionScreen"

const ExploreScreenNavigator = createStackNavigator(
    {
        Explore: { screen: ExploreScreen, navigationOptions: { title: '发现' } },
        CreateHean: { screen: CreateHeanScreen, navigationOptions: { title: '写函' } },
        // CreateJournal 页面不显示页眉
        CreateJournal: { screen: CreateJournalScreen, navigationOptions: { header: null } },
        CreateDiary: { screen: CreateDiaryScreen, navigationOptions: { title: '写日记' } },
        PostSubmission: { screen: PostSubmissionScreen, navigationOptions: { title: '投稿' } },
        SelectHean: { screen: SelectHeanScreen, navigationOptions: { title: '选择函' } },
        Submission: { screen: SubmissionScreen, navigationOptions: { title: '投稿' } }
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