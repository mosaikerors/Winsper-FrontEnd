import React from "react";
import { Text, Dimensions, TouchableOpacity, FlatList, View } from "react-native";
import { Divider } from 'react-native-elements'
import HeanCard from "../../components/hean/HeanCard";
import agent from "../../agent/index";
import { connect } from "react-redux";
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Loading from "../../components/Loading"
import EmptyList from "../../components/EmptyList"
import theme from "../../theme"

const { width } = Dimensions.get("window");

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

const mapDispatchToProps = dispatch => ({

});

class SelectHeanScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heans: null,
            selectedIndex: null,
        }
        this.updateState = this.updateState.bind(this);
    }

    async updateState() {
        const { uId, token } = this.props;
        const response = await agent.hean.getHeanCardList(uId, token, uId);    // 看自己的函
        if (response.rescode === 0)
            this.setState({ heans: response.heanCards });
    }

    componentWillMount() {
        this.updateState();
    }

    render() {
        const { selectedIndex, heans } = this.state
        if (!heans)
            return <Loading />;
        if (heans.length === 0)
            return <EmptyList field="函列表" />
        return (
            <React.Fragment>
                <View style={{ flexDirection: "row", width: "100%", backgroundColor: theme.palette.sky[0] }}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                            <FontAwesome name="close" size={28} style={{ margin: 10 }} color="red" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row-reverse", flex: 1 }}>
                        <TouchableOpacity
                            disabled={!selectedIndex && selectedIndex !== 0}
                            onPress={() => this.props.navigation.navigate("PostSubmission", { hId: heans[selectedIndex].hId })}
                        >
                            <FontAwesome name="check" size={28} style={{ margin: 10 }}
                                color={!selectedIndex && selectedIndex !== 0 ? "grey" : "green"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider />
                <View style={{ borderWidth: 0, flex: 1, backgroundColor: theme.palette.sky[0] }}>
                    {heans.map((hean, index) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ selectedIndex: this.state.selectedIndex === index ? null : index })
                                }}
                                style={this.state.selectedIndex === index && { borderWidth: 2, borderColor: "cyan" }}
                                activeOpacity={0.8}
                            >
                                <HeanCard hId={hean.hId} whenSubmission={true} />
                            </TouchableOpacity>
                            <Divider />
                        </View>
                    ))}
                </View>
            </React.Fragment>
        );
    }
}
export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(SelectHeanScreen));