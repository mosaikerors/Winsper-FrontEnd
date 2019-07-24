import React, { Component } from 'react';
import Comment from '../../../components/myinfo/Comment'
import { Avatar } from 'react-native-elements';
import { StyleSheet, KeyboardAvoidingView, View, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import ImageGroup from '../../../components/hean/ImageGroup';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import agent from "../../../agent";

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

const mapDispatchToProps = dispatch => ({

});
class HeanDetailScreen extends Component {
    static navigationOptions = {
        title: "函"
    };

    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            commentObject: 0, // 0 : comment hean, 1: comment to comment
            commentToCommentId: 0,
            likeCount: null,
            starCount: null,
            hasLiked: null,
            hasStarred: null,
            commentCount: null,
            text: '',
            hean: null
        };
        this.changeText = this.changeText.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.changeLike = this.changeLike.bind(this);
        this.changeStar = this.changeStar.bind(this);
        this.commentHean = this.commentHean.bind(this);
        this.commentToComment = this.commentToComment.bind(this);
    };

    async componentWillMount() {
        const hean = this.props.navigation.getParam("hean", {});
        const { uId, token } = this.props;
        const response = await agent.hean.getDetailedHean(uId, token, hean.hId);
        console.log("hean: " + hean);
        console.log("response: " + response);
        console.log("hean keys: " + Object.keys(hean))
        console.log("response keys: " + Object.keys(response))
        this.setState({
            likeCount: hean.likeCount,
            starCount: hean.starCount,
            hasLiked: hean.hasLiked,
            hasStarred: hean.hasStarred,
            commentCount: hean.commentCount,
            text: hean.text,
            hean: response.hean
        })
    }

    changeLike() {
        const { likeCount, hasLiked } = this.state;
        if (hasLiked) {
            this.setState({
                likeCount: likeCount - 1,
                hasLiked: !hasLiked
            })
        }
        else {
            this.setState({
                likeCount: likeCount + 1,
                hasLiked: !hasLiked
            })
        }
    }

    changeStar() {
        const { starCount, hasStarred } = this.state;
        if (hasStarred) {
            this.setState({
                starCount: starCount - 1,
                hasStarred: !hasStarred
            })
        }
        else {
            this.setState({
                starCount: starCount + 1,
                hasStarred: !hasStarred
            })
        }
    }

    changeText(comment) {
        this.setState({
            comment
        })
    }

    submitComment() {
        if (this.state.comment !== "") {
            if (this.state.commentObject === 1) {
                Alert.alert("comment to comment, comment ID = " + this.state.commentToCommentId
                    + " content: " + this.state.comment);
            }
            else {
                Alert.alert("comment to hean " + hean.hId + " content: " + this.state.comment);
            }
        }
    }

    commentHean() {
        this.setState({
            commentObject: 0
        });
        this.refs.input.focus();
    }

    commentToComment(commentId) {
        this.setState({
            commentObject: 1,
            commentToCommentId: commentId
        });
        this.refs.input.focus();
    }

    render() {
        console.log(this.state.hean)
        const { hean } = this.state;
        if (!hean)
            return null;
        return (
            <KeyboardAvoidingView>
                <ScrollView style={css.view}>
                    <View style={css.Icon}>
                        <Avatar
                            rounded
                            size={"medium"}
                            source={{ uri: hean.avatar }}
                        />
                        <View style={css.username}>
                            <Text >{hean.username}</Text>
                            <Text>{hean.createdTime}</Text>
                        </View>
                    </View>
                    <Text style={css.font}>{this.state.text}</Text>
                    <ImageGroup length={hean.pics.length} images={hean.pics} />
                    <View style={css.IconGroup} >
                        <View style={css.Icon}>
                            <TouchableOpacity onPress={this.changeLike}>
                                <AntDesign
                                    name={"like2"}
                                    size={20}
                                    color={this.state.hasLiked ? "red" : "black"}
                                />
                            </TouchableOpacity>
                            <Text>{this.state.likeCount}</Text>
                        </View>
                        <View style={css.Icon}>
                            <TouchableOpacity onPress={this.changeStar}>
                                <Feather
                                    name={"star"}
                                    size={20}
                                    color={this.state.hasStarred ? "red" : "black"}
                                />
                            </TouchableOpacity>
                            <Text>{this.state.starCount}</Text>
                        </View>
                        <View style={css.Icon}>
                            <TouchableOpacity onPress={this.commentHean}>
                                <FontAwesome
                                    name={"comment-o"}
                                    size={20}
                                />
                            </TouchableOpacity>
                            <Text>{this.state.commentCount}</Text>
                        </View>
                    </View>
                    {
                        hean.comments.map((item, index) => (
                            <TouchableOpacity onPress={() => this.commentToComment(item.commentId)}>
                                <Comment comment={item} />
                            </TouchableOpacity>
                        ))
                    }
                    <View style={css.bottomBlank} />
                </ScrollView>
                <View style={css.commentBox}>
                    <TextInput
                        ref="input"
                        placeholder={'说说你的想法'}
                        onChangeText={this.changeText}
                    />
                    <TouchableOpacity onPress={this.submitComment} style={css.sendIcon}>
                        <FontAwesome
                            name={"send"}
                            color={this.state.comment === "" ? "grey" : "blue"}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeanDetailScreen);
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