import React from "react";
import { Text, Dimensions, TouchableOpacity, FlatList, View } from "react-native";
import { Divider } from 'react-native-elements'
import HeanCard from "../../../components/hean/HeanCard";
import agent from "../../../agent/index";
import { connect } from "react-redux";
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
            heans: [],
        }
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const response = await agent.hean.getHeanCardList(uId, token, uId);    // 看自己的函
        if (response.rescode === 0)
            this.setState({ heans: response.heanCards });
    }

    render() {
        if (!this.state.heans)
            return <Text>No heans yet!</Text>;
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
export default connect(mapStateToProps, mapDispatchToProps)(HeanListScreen);