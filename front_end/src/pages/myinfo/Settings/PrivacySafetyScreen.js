import React from "react";
import { Text, View, StyleSheet, TextInput, Switch } from "react-native";
import { ListItem } from 'react-native-elements'
import agent from "../../../agent/index";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId,
})

const mapDispatchToProps = dispatch => ({
})

const fieldlist = ['消息', '函', '收藏', '日记', '手账', '投稿', '心情报表', '评论'];

const suffix = "对于他人是否可见";

class PrivacySafetyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switches: [false, true, false, false, true, true, false, true]
        }
        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    async toggleSwitch(index) {
        const { uId, token } = this.props;
        let switches = this.state.switches
        const toBePublic = !switches[index];
        switches[index] = toBePublic;
        this.setState({ switches });
        let response;
        switch (index) {
            case 0:
                response = await agent.user.toggleMessagePrivacy(uId, token, toBePublic)
                break;
            case 1:
                response = await agent.user.toggleHeanPrivacy(uId, token, toBePublic)
                break;
            case 2:
                response = await agent.user.toggleCollectionPrivacy(uId, token, toBePublic)
                break;
            case 3:
                response = await agent.user.toggleDiaryPrivacy(uId, token, toBePublic)
                break;
            case 4:
                response = await agent.user.toggleJournalPrivacy(uId, token, toBePublic)
                break;
            case 5:
                response = await agent.user.toggleSubmissionPrivacy(uId, token, toBePublic)
                break;
            case 6:
                response = await agent.user.toggleMoodReportPrivacy(uId, token, toBePublic)
                break;
            case 7:
                response = await agent.user.toggleCommentPrivacy(uId, token, toBePublic)
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <React.Fragment>
                <View>
                    <View>
                        {fieldlist.map((listItem, index) => (
                            <ListItem
                                key={index}
                                title={listItem + suffix}
                                rightIcon={<Switch onValueChange={() => this.toggleSwitch(index)} value={this.state.switches[index]} />}
                            />
                        ))}
                    </View>
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivacySafetyScreen);