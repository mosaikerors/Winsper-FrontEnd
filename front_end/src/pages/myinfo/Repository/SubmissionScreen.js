import React from "react";
import { Text, Dimensions, TouchableOpacity, FlatList, View } from "react-native";
import { ListItem } from 'react-native-elements'
import { Divider } from 'react-native-elements'
import { connect } from "react-redux";
import HeanCard from "../../../components/hean/HeanCard";
import agent from "../../../agent/index";
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loading from "../../../components/Loading"
import EmptyList from "../../../components/EmptyList"
import theme from "../../../theme"

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

const mapDispatchToProps = dispatch => ({

});


class SubmissionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heans: null,
            otherUId: this.props.navigation.getParam("otherUId", this.props.uId)
        }
        this.updateState = this.updateState.bind(this);
    }

    async updateState() {
        const { uId, token } = this.props;
        const { otherUId } = this.state;
        let response;
        if (otherUId === 0)  // view selected submission
            response = await agent.hean.getSelectedSubmissions(uId, token, 1);  // todo: date here!
        else  // view someone's submission
            response = await agent.hean.getSubmissionsById(uId, token, otherUId)
        if (response.rescode === 0) {
            let heans = [];
            let tmp = {};
            response.heanCards.forEach((heanCard, index) => {
                if ((index + 1) % 2 !== 0) {
                    tmp.left = heanCard;
                }
                else {
                    tmp.right = heanCard;
                    heans.push(JSON.parse(JSON.stringify(tmp)));  // for deep copy
                }
            });
            if (response.heanCards.length % 2 !== 0) {
                tmp.right = null;
                heans.push(JSON.parse(JSON.stringify(tmp)));  // for deep copy
            }
            this.setState({ heans });
        }
    }

    componentWillMount() {
        this.updateState();
    }

    componentWillReceiveProps(nextProps) {
        // if you will reach this page, grab newest data
        if (nextProps.isFocused) {
            this.updateState();
        }
    }

    render() {
        const { heans } = this.state
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
                        data={this.state.heans}
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
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(SubmissionScreen));