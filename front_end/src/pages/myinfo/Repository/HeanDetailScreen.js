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
        position: 'absolute',
        right: 20
    }
});

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
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
            comment: {
                content: null,   // 你的评论内容
                targetCommentId: null,  // 你的评论对象，为 null 表示评论的是函
            }
        };
        this.submitComment = this.submitComment.bind(this);
        this.changeLike = this.changeLike.bind(this);
        this.changeStar = this.changeStar.bind(this);
        this.commentToComment = this.commentToComment.bind(this);
    };

    async componentWillMount() {
        const { uId, token } = this.props;
        const response = await agent.hean.getDetailedHean(uId, token, this.state.heanCard.hId);
        if (response.rescode === 0)
            this.setState({ heanDetailed: response.hean })
    }

    changeLike() {
        const { hasLiked, likeCount } = this.state.heanCard;
        if (hasLiked)
            this.setState({ heanCard: Object.assign({}, this.state.heanCard, { hasLiked: !hasLiked, likeCount: likeCount - 1 }) })
        else
            this.setState({ heanCard: Object.assign({}, this.state.heanCard, { hasLiked: !hasLiked, likeCount: likeCount + 1 }) })
    }

    changeStar() {
        const { hasStarred, starCount } = this.state.heanCard;
        if (hasStarred)
            this.setState({ heanCard: Object.assign({}, this.state.heanCard, { hasStarred: !hasStarred, starCount: starCount - 1 }) })
        else
            this.setState({ heanCard: Object.assign({}, this.state.heanCard, { hasStarred: !hasStarred, starCount: starCount + 1 }) })
    }

    submitComment() {
        if (this.state.comment.content) {
            if (this.state.comment.targetCommentId) {
                Alert.alert("comment to comment, comment ID = " + this.state.comment.targetCommentId
                    + " content: " + this.state.comment.content);
            }
            else {
                Alert.alert("comment to hean " + this.state.heanDetailed.hId + " content: " + this.state.comment.content);
            }
        }
    }

    commentToComment(targetCommentId) {
        this.setState({ comment: Object.assign({}, this.state.comment, { targetCommentId }) })
        this.refs.input.focus();
    }

    render() {
        const { hId, uId, avatar, username, createdTime, pictures, comments } = this.state.heanDetailed;
        const { text, likeCount, starCount, commentCount, hasLiked, hasStarred } = this.state.heanCard;
        if (!hId)
            return null;
        return (
            <React.Fragment>
                <KeyboardAvoidingView>
                    <ScrollView style={css.view}>

                        {/* avatar, username, createdTime */}
                        <View style={css.Icon}>
                            <Avatar
                                rounded
                                size={"medium"}
                                source={{ uri: avatar }}
                            />
                            <View style={css.username}>
                                <Text >{username}</Text>
                                <Text>{createdTime}</Text>
                            </View>
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
                            <TouchableOpacity onPress={() => this.commentToComment(item.commentId)}>
                                <Comment comment={item} />
                            </TouchableOpacity>
                        ))}
                        <View style={css.bottomBlank} />
                    </ScrollView>

                    {/* comment input bar */}
                    <View style={css.commentBox}>
                        <TextInput
                            ref="input"
                            placeholder={'说说你的想法'}
                            onChangeText={content => this.setState({ comment: Object.assign({}, this.state.comment, { content }) })}
                        />
                        <TouchableOpacity onPress={this.submitComment} style={css.sendIcon}>
                            <FontAwesome
                                name={"send"}
                                color={this.state.comment.content ? "blue" : "grey"}
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