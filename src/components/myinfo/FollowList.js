import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from 'react-native-elements'
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loading from '../Loading'
import agent from "../../agent/index"
import EmptyList from "../EmptyList"
import theme from "../../theme"

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }
];


const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
});

const defaultAvatar = require("../../../images/defaultAvatar.jpg")

class FollowList extends React.Component {
    render() {
        const { followlist } = this.props;
        if (!followlist)
            return <Loading />;
        if (followlist.length === 0)
            return <EmptyList field="关注列表" />;
        return (
            <React.Fragment>
                <View>
                    {followlist.map((listItem, index) => (
                        <TouchableOpacity onPress={() => this.props.navigation.push("PersonPage", { uId: listItem.uId })}>
                            <ListItem
                                containerStyle={{ backgroundColor: theme.palette.sky[0], borderWidth: 0 }}
                                key={index}
                                leftAvatar={{
                                    source: listItem.avatar === '' ? defaultAvatar : { uri: listItem.avatar },
                                    containerStyle: { borderWidth: 1 }
                                }}
                                title={listItem.username}
                                rightIcon={listItem.isMutualFollow && (
                                    <FontAwesome
                                        name={"heart"}
                                        color={"pink"}
                                        size={20}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowList);