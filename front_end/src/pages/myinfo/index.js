import { createStackNavigator, createAppContainer } from "react-navigation";
import LoggedInScreen from "./LoggedInScreen"
import FollowingScreen from "./Follow/FollowingScreen"
import FollowersScreen from "./Follow/FollowersScreen"
import MutualFollowScreen from "./Follow/MutualFollowScreen";
import MessageScreen from "./Repository/MessageScreen";
import HeanScreen from "./Repository/HeanScreen";
import CollectionScreen from "./Repository/CollectionScreen";
import DiaryScreen from "./Repository/DiaryScreen";
import JournalScreen from "./Repository/JournalScreen";
import SubmissionScreen from "./Repository/SubmissionScreen";
import MoodReportScreen from "./Repository/MoodReportScreen";
import CommentScreen from "./Repository/CommentScreen";
import LoggedOutScreen from "./LoggedOutScreen"

const MyInfoScreen = createStackNavigator(
    {
        LoggedOut: { screen: LoggedOutScreen },
        LoggedIn: { screen: LoggedInScreen },
        Following: { screen: FollowingScreen },
        Followers: { screen: FollowersScreen },
        MutualFollow: { screen: MutualFollowScreen },
        Message: { screen: MessageScreen },
        Hean: { screen: HeanScreen },
        Collection: { screen: CollectionScreen },
        Diary: { screen: DiaryScreen },
        Journal: { screen: JournalScreen },
        Submission: { screen: SubmissionScreen },
        MoodReport: { screen: MoodReportScreen },
        Comment: { screen: CommentScreen },
    },
    {
        initialRouteName: "LoggedIn"
    }
);

export default createAppContainer(MyInfoScreen);