import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { ListItem } from 'react-native-elements'
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loading from '../Loading'
import agent from "../../agent/index"
import EmptyList from "../EmptyList"
import theme from "../../theme"

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
                <ScrollView>
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
                </ScrollView>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowList);