import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements'
import HeanCard from "../../../components/hean/HeanCard";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import agent from "../../../agent";
import { connect } from "react-redux"

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
})

const mapDispatchToProps = dispatch => ({

})

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
        console.log("here" + uId);
        console.log("here" + token);
        try {
            const response = await agent.hean.searchByUId(uId, token)
            console.log(response)
            this.setState({
                heans: response.heanArray
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        if (!this.state.heans)
            return <Text>No heans yet!</Text>;
        console.log(this.state.heans)
        return (
            <React.Fragment>
                <FlatList
                    data={this.state.heans}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={{ }} onPress={() => this.props.navigation.navigate("HeanDetail", { hean: item })}>
                            <View style={{ height: "100%",  }}>
                                <HeanCard
                                    src={item.pics[0]}
                                />
                            </View>

                        </TouchableOpacity>
                    )}
                />
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeanListScreen);