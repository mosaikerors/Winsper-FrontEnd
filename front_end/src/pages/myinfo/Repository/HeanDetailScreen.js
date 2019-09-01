import React, { Component } from 'react';
import Comment from '../../../components/hean/Comment'
import { Avatar } from 'react-native-elements';
import { StyleSheet, KeyboardAvoidingView, View, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import ImageGroup from '../../../components/hean/ImageGroup';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import agent from "../../../agent/index";


const css = StyleSheet.create({
    bottomBlank: {
        height: 40,
        backgroundColor: "#ffffff",
    },
    username: {
        marginLeft: 10,
        flexDirection: "column"
    },
    font: {
        lineHeight: 20
    },
    IconGroup: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 5,
        marginTop: 5
    },
    view: {
        paddingLeft: 10,
        paddingRight: 10
    },
    Icon: {
        flexDirection: "row",
        alignItems: "center"
    },
    commentBox: {
        position: 'absolute',
        height: 40,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
    },
    sendIcon: {
        marginRight: 16
    }
});

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId,
    myUsername: state.user.username
});

const mapDispatchToProps = dispatch => ({

});
class HeanDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // heanDetailed 是请求函的详细信息后得到的响应
            heanDetailed: {
                hId: null,
                uId: null,
                avater: null,
                username: '',
                createdTime: null,
                pictures: [],
                comments: [],
            },
            // heanCard 是请求卡片形式的函后得到的响应
            // 以 navagation params 的形式传递进来，然后在 willMount 钩子中以其中的 hId 去请求详细信息
            heanCard: this.props.navigation.getParam("heanCard", {}),
            myComment: null,
        };
        this.submitComment = this.submitComment.bind(this);
        this.changeLike = this.changeLike.bind(this);
        this.changeStar = this.changeStar.bind(this);
        this.updateState = this.updateState.bind(this);
        this.deleteHean = this.deleteHean.bind(this);
    };

    async updateState() {
        const { uId, token } = this.props;
        const response = await agent.hean.getDetailedHean(uId, token, this.state.heanCard.hId);
        if (response.rescode === 0)
            this.setState({ heanDetailed: response.hean })
    }

    async componentWillMount() {
        this.updateState()
    }

    changeLike() {
        const { hasLiked, likeCount } = this.state.heanCard;
        const { uId, token, myUsername } = this.props;
        const { hId } = this.state.heanCard;
        const otherUId = this.state.heanDetailed.uId;
        if (hasLiked) {
            agent.hean.dislike(uId, token, hId);
            this.setState({ heanCard: Object.assign({}, this.state.heanCard, { hasLiked: !hasLiked, likeCount: likeCount - 1 }) })
        }
        else {
            console.log("hererere")
            agent.ws.send(`{ "type": 2, "receiverUId": ${otherUId}, "senderUsername": "${myUsername}", "hId": "${hId}" }`);
            agent.hean.like(uId, token, hId);
            this.setState({ heanCard: Object.assign({}, this.state.heanCard, { hasLiked: !hasLiked, likeCount: likeCount + 1 }) })
        }
    }

    async changeStar() {
        const { hasStarred, starCount } = this.state.heanCard;
        const { uId, token, myUsername } = this.props;
        const { hId } = this.state.heanCard;
        const otherUId = this.state.heanDetailed.uId;
        if (hasStarred) {
            agent.hean.uncollect(uId, token, hId);
            this.setState({ heanCard: Object.assign({}, this.state.heanCard, { hasStarred: !hasStarred, starCount: starCount - 1 }) })
        }
        else {
            agent.ws.send(`{ "type": 3, "receiverUId": ${otherUId}, "senderUsername": "${myUsername}", "hId": "${hId}" }`);
            agent.hean.collect(uId, token, hId);
            this.setState({ heanCard: Object.assign({}, this.state.heanCard, { hasStarred: !hasStarred, starCount: starCount + 1 }) })
        }
    }

    async submitComment() {
        const { uId, token, myUsername } = this.props;
        const { hId, commentCount } = this.state.heanCard;
        const { myComment } = this.state;
        const otherUId = this.state.heanDetailed.uId;
        if (myComment) {
            agent.ws.send(`{ "type": 4, "receiverUId": ${otherUId}, "senderUsername": "${myUsername}", "hId": "${hId}", "text": "${myComment}" }`);
            const response = await agent.hean.comment(uId, token, hId, myComment);
            this.setState({
                heanCard: Object.assign({}, this.state.heanCard, { commentCount: commentCount + 1 }),
                myComment: null
            })
            this.updateState();
            this.refs.input.blur()
        }
    }

    async deleteHean() {
        const { uId, token } = this.props;
        const { hId } = this.state.heanCard;
        const response = await agent.hean.deleteHean(uId, token, hId);
        console.log("delete", response)
        this.props.navigation.pop();
    }

    render() {
        const { hId, avatar, username, createdTime, pictures, comments } = this.state.heanDetailed;
        const { text, likeCount, starCount, commentCount, hasLiked, hasStarred } = this.state.heanCard;
        if (!hId)
            return null;
        return (
            <React.Fragment>
                <KeyboardAvoidingView>
                    <ScrollView style={css.view}>

                        {/* avatar, username, createdTime */}
                        <View style={[css.Icon, { borderWidth: 0 }]}>
                            <Avatar
                                rounded
                                size={"medium"}
                                source={{ uri: avatar }}
                            />
                            <View style={[css.username, { borderWidth: 0, flex: 1 }]}>
                                <Text>{username}</Text>
                                <Text>{createdTime}</Text>
                            </View>
                            {this.props.uId === this.state.heanDetailed.uId &&
                                <TouchableOpacity style={{ margin: 10, borderWidth: 0, padding: 5 }} onPress={this.deleteHean}>
                                    <FontAwesome
                                        name={"trash"}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            }
                        </View>

                        {/* content */}
                        <Text style={css.font}>{text}</Text>

                        {/* pictures */}
                        <ImageGroup length={pictures.length} images={pictures} />

                        {/* like, star and comment */}
                        <View style={css.IconGroup} >
                            <View style={css.Icon}>
                                <TouchableOpacity onPress={this.changeLike}>
                                    <AntDesign
                                        name={"like2"}
                                        size={20}
                                        color={hasLiked ? "red" : "black"}
                                    />
                                </TouchableOpacity>
                                <Text>{likeCount}</Text>
                            </View>
                            <View style={css.Icon}>
                                <TouchableOpacity onPress={this.changeStar}>
                                    <Feather
                                        name={"star"}
                                        size={20}
                                        color={hasStarred ? "red" : "black"}
                                    />
                                </TouchableOpacity>
                                <Text>{starCount}</Text>
                            </View>
                            <View style={css.Icon}>
                                <TouchableOpacity onPress={() => this.refs.input.focus()}>
                                    <FontAwesome
                                        name={"comment-o"}
                                        size={20}
                                    />
                                </TouchableOpacity>
                                <Text>{commentCount}</Text>
                            </View>
                        </View>

                        {/* detailed comments */}
                        {comments.map((item, index) => (
                            <Comment comment={item} />
                        ))}
                        <View style={css.bottomBlank} />
                    </ScrollView>

                    {/* comment input bar */}
                    <View style={css.commentBox}>
                        <TextInput
                            ref="input"
                            placeholder={'说说你的想法'}
                            onChangeText={myComment => this.setState({ myComment })}
                            value={this.state.myComment}
                            style={{ borderWidth: 0, flex: 1 }}
                        />
                        <TouchableOpacity onPress={this.submitComment} style={[css.sendIcon, { borderWidth: 0 }]}>
                            <FontAwesome
                                name={"send"}
                                color={this.state.myComment ? "blue" : "grey"}
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeanDetailScreen);