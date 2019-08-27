import React from "react";
import { Text, Dimensions, TouchableOpacity, FlatList, View } from "react-native";
import { Divider } from 'react-native-elements'
import HeanCard from "../../../components/hean/HeanCard";
import agent from "../../../agent/index";
import { connect } from "react-redux";
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
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
            otherUId: this.props.navigation.getParam("otherUId", this.props.uId)
        }
        this.updateState = this.updateState.bind(this);
    }

    async updateState() {
        const { uId, token } = this.props;
        const { otherUId } = this.state;
        const response = await agent.hean.getHeanCardList(uId, token, otherUId);    // 看自己的函
        if (response.rescode === 0)
            this.setState({ heans: response.heanCards });
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
        if (!this.state.heans)
            return null;
        return (
            <React.Fragment>
                <FlatList
                    data={this.state.heans}
                    renderItem={({ item, index }) => (
                        <View>
                            <HeanCard hId={item.hId} navigation={this.props.navigation} />
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