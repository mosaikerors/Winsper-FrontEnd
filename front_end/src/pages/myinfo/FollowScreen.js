import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import FollowList from "../../components/myinfo/FollowList"

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

class FollowScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const initTab = this.props.navigation.getParam("tab", 0);
        console.log("initTab: "+initTab)
        return (
            <React.Fragment>
                <ScrollableTabView renderTabBar={() => <DefaultTabBar />} initialPage={initTab} style={{ marginTop: 0 }}>
                    <FollowList tabLabel="互相关注" navigation={this.props.navigation} />
                    <FollowList tabLabel="我的关注" navigation={this.props.navigation} />
                    <FollowList tabLabel="我的粉丝" navigation={this.props.navigation} />
                </ScrollableTabView>
            </React.Fragment>
        );
    }
}
export default FollowScreen;