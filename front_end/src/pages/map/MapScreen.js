import React from "react";
import { Text, View } from "react-native";
import { MapView, MapTypes } from "react-native-baidu-map"
import MapDemo from "./MapDemo";
import MyMap from "./MyMap";
import agent from "../../agent";
import { connect } from "react-redux"
import { NavigationEvents } from "react-navigation";

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId,
    heans: state.hean.heans
})

const mapDispatchToProps = dispatch => ({

})

class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heans: []
        }
    }

    //once login, props will change and this hook will be triggared, at this time, to get all heans from back end.
    //seemingly cannot use componentWillUpdate hook here due to some magic recursive call
    async componentWillReceiveProps(nextProps) {
        const { uId, token } = nextProps;
        const response = await agent.hean.getAll(uId, token);
        this.setState({
            heans: response.heanArray
        })
    }

    render() {
        return (
            <React.Fragment>
                <MyMap heans={this.state.heans} />
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);