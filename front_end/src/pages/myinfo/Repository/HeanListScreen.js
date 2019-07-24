import React from "react";
import { Text,Dimensions, TouchableOpacity, FlatList } from "react-native";
import HeanCard from "../../../components/hean/HeanCard";
import agent from "../../../agent";
import { connect } from "react-redux";
const {width} = Dimensions.get("window");

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

const mapDispatchToProps = dispatch => ({

});

class HeanListScreen extends React.Component {
    static navigationOptions = {
        title: "我的函"
    };

    constructor(props) {
        super(props);
        this.state = {
            heans: [],
        }
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        try {
            const response = await agent.hean.searchByUId(uId, token, uId);    // 看自己的函
            this.setState({
                heans: response.heanCards
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        if (!this.state.heans)
            return <Text>No heans yet!</Text>;
        return (
            <React.Fragment>
                <FlatList
                    data={this.state.heans}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={{margin: width / 18}}
                                          onPress={() => this.props.navigation.navigate("HeanDetail", { hean: item })}>
                                <HeanCard hean={item}/>
                        </TouchableOpacity>
                    )}
                />
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeanListScreen);