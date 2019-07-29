import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux"

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
    block: {
        flex: 1,
        height: 80
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
});

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
});

const mapDispatchToProps = dispatch => ({
});

class FollowBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mutualFollow: this.props.mutualFollow,
            following: this.props.following,
            followers: this.props.followers
        }
    }
    render() {
        const { mutualFollow, following, followers } = this.state;
        return (
            <React.Fragment>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.block}>
                        <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.push('Follow', { tab: 0 })}>
                            <Text>{mutualFollow}</Text>
                            <Text>互相关注</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.block}>
                        <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.push('Follow', { tab: 1 })}>
                            <Text>{following}</Text>
                            <Text>关注</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.block}>
                        <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.push('Follow', { tab: 2 })}>
                            <Text>{followers}</Text>
                            <Text>粉丝</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </React.Fragment >
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowBanner);