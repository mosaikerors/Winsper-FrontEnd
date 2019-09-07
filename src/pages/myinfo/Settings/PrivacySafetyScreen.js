import React from "react";
import { Text, View, StyleSheet, TextInput, Switch } from "react-native";
import { ListItem } from 'react-native-elements'
import agent from "../../../agent/index";
import { connect } from "react-redux";
import theme from "../../../theme"

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId,
    privacy: state.user.privacy
})

const mapDispatchToProps = dispatch => ({
    onUpdate: (privacy) =>
        dispatch({ type: 'UPDATE_PRIVACY', payload: { privacy } })
})

const fieldlist = ['函', '收藏', '日记', '手账', '投稿', '心情报表', '评论'];

const suffix = "对于他人是否可见";

class PrivacySafetyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            privacy: this.props.privacy
        }
        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    async toggleSwitch(index) {
        // state, Redux store, datebase 全部更新
        const { uId, token } = this.props;
        let privacy = this.props.privacy
        const toBePublic = !privacy[index];
        privacy[index] = toBePublic;
        this.props.onUpdate(privacy)
        this.setState({ privacy })
        let response;
        switch (index) {
            case 0:
                response = await agent.user.toggleHeanPrivacy(uId, token, toBePublic)
                break;
            case 1:
                response = await agent.user.toggleCollectionPrivacy(uId, token, toBePublic)
                break;
            case 2:
                response = await agent.user.toggleDiaryPrivacy(uId, token, toBePublic)
                break;
            case 3:
                response = await agent.user.toggleJournalPrivacy(uId, token, toBePublic)
                break;
            case 4:
                response = await agent.user.toggleSubmissionPrivacy(uId, token, toBePublic)
                break;
            case 5:
                response = await agent.user.toggleMoodReportPrivacy(uId, token, toBePublic)
                break;
            case 6:
                response = await agent.user.toggleCommentPrivacy(uId, token, toBePublic)
                break;
            default:
                break;
        }
    }

    // 尽管 render 中用的仍然是 props 数据，但是因为有了 setState，所以 render 会被触发
    render() {
        return (
            <React.Fragment>
                <View style={{ borderWidth: 0, flex: 1, backgroundColor: theme.palette.sky[0] }}>
                    <View>
                        {fieldlist.map((listItem, index) => (
                            <ListItem
                                containerStyle={{ backgroundColor: theme.palette.sky[0] }}
                                key={index}
                                title={listItem + suffix}
                                rightIcon={
                                    <Switch
                                        onValueChange={() => this.toggleSwitch(index)}
                                        value={this.props.privacy[index]}
                                    />
                                }
                            />
                        ))}
                    </View>
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivacySafetyScreen);