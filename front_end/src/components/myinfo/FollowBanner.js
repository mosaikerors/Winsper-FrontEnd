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
        height: 80,
        //flexDirection: 'column'
        //borderWidth: 1,
        //borderColor: "#bbdefb"
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token,
    mutualFollow: state.user.mutualFollow,
    following: state.user.following,
    followers: state.user.followers
})

const mapDispatchToProps = dispatch => ({
})

class FollowBanner extends React.Component {
    render() {
        return (
            <React.Fragment>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.block}>
                        <TouchableOpacity style={styles.text} onPress={()=>this.props.navigation.navigate('MutualFollow')}>
                            <Text>{this.props.mutualFollow}</Text>
                            <Text>互相关注</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.block}>
                        <TouchableOpacity style={styles.text} onPress={()=>this.props.navigation.navigate('Following')}>
                            <Text>{this.props.following}</Text>
                            <Text>关注</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.block}>
                        <TouchableOpacity style={styles.text} onPress={()=>this.props.navigation.navigate('Followers')}>
                            <Text>{this.props.followers}</Text>
                            <Text>粉丝</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </React.Fragment >
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowBanner);