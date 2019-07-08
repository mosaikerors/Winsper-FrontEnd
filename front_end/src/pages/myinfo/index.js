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
import SettingsScreen from "./SettingsScreen"
import HeanDetailScreen from "./Repository/HeanDetailScreen"

const MyInfoScreen = createStackNavigator(
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
        HeanDetail: { screen: HeanDetailScreen }
    },
    {
        initialRouteName: "LoggedIn"
    }
);

export default createAppContainer(MyInfoScreen);