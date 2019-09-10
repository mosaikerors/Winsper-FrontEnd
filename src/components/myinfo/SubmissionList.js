import React from "react";
import { Text, Dimensions, TouchableOpacity, FlatList, View } from "react-native";
import { ListItem } from 'react-native-elements'
import { Divider } from 'react-native-elements'
import { connect } from "react-redux";
import HeanCard from "../hean/HeanCard";
import agent from "../../agent/index";
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loading from "../Loading"
import EmptyList from "../EmptyList"
import theme from "../../theme"

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

const mapDispatchToProps = dispatch => ({

});


class SubmissionList extends React.Component {
    render() {
        const { heans } = this.props
        if (!heans)
            return <Loading />;
        if (heans.length === 0)
            return <EmptyList field="投稿列表" />
        return (
            <React.Fragment>
                <View style={{ height: 40, flexDirection: 'row-reverse', backgroundColor: theme.palette.sky[0] }}>
                    <TouchableOpacity
                        style={{ borderWidth: 0, width: 100, justifyContent: "center", alignItems: "center", flexDirection: "row" }}
                        onPress={() => this.props.navigation.push("PostSubmission")}
                    >
                        <FontAwesome name={"envelope-o"} size={20} />
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>去投稿</Text>
                    </TouchableOpacity>
                </View>
                <Divider />
                <View style={{ backgroundColor: theme.palette.sky[0], flex: 1 }}>
                    <FlatList
                        data={heans}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ width: "50%" }}>
                                    <HeanCard hId={item.left.hId} navigation={this.props.navigation} />
                                </View>
                                {item.right &&
                                    <View style={{ width: "50%" }}>
                                        <HeanCard hId={item.right.hId} navigation={this.props.navigation} />
                                    </View>
                                }
                            </View>
                        )}
                        disableVirtualization
                    />
                </View>
            </React.Fragment >
        );
    }
}
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(SubmissionList));