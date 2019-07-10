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

    async componentWillMount() {
        const { uId, token } = this.props;
        console.log("here: " + uId);
        console.log("here: " + token);
        try {
            const response = await agent.hean.getAll(uId, token);
            console.log(response);
            this.setState({
                heans: response.heanArray
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        console.log("******" + this.props.heans)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {<MyMap heans={this.props.heans} />}
                {/*<Text>map</Text>*/}
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);