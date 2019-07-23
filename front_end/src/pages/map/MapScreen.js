import React from "react";
import MyMap from "./MyMap";
import agent from "../../agent";
import { connect } from "react-redux"

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId,
    heans: state.hean.heans
});

const mapDispatchToProps = dispatch => ({

});

class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heans: []
        }
    }

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