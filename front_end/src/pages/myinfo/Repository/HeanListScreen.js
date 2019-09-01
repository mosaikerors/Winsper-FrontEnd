import React from "react";
import { Text, Dimensions, TouchableOpacity, FlatList, View } from "react-native";
import { Divider } from 'react-native-elements'
import HeanCard from "../../../components/hean/HeanCard";
import agent from "../../../agent/index";
import { connect } from "react-redux";
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import Loading from "../../../components/Loading"

const { width } = Dimensions.get("window");

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

const mapDispatchToProps = dispatch => ({

});

class HeanListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heans: null,
            otherUId: this.props.navigation.getParam("otherUId", this.props.uId),
            hackingTrigger: 0
        }
        this.updateState = this.updateState.bind(this);
    }

    async updateState() {
        const { uId, token } = this.props;
        const { otherUId, hackingTrigger } = this.state;
        const response = await agent.hean.getHeanCardList(uId, token, otherUId);    // 看自己的函
        if (response.rescode === 0)
            this.setState({ heans: response.heanCards, hackingTrigger: hackingTrigger + 1 });
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
        const { hackingTrigger } = this.state;
        if (!this.state.heans)
            return <Loading />;
        return (
            <React.Fragment>
                <FlatList
                    data={this.state.heans}
                    renderItem={({ item, index }) => (
                        <View>
                            <HeanCard hId={item.hId} navigation={this.props.navigation} hackingTrigger={hackingTrigger} />
                            <Divider />
                        </View>
                    )}
                    disableVirtualization
                />
            </React.Fragment>
        );
    }
}
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(HeanListScreen));