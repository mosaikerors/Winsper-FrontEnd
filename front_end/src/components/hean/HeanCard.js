import React from 'react';
import { Text, View, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTheme } from 'react-native-material-kit';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import agent from "../../agent"
import { TouchableOpacity } from 'react-native-gesture-handler';

const theme = getTheme();

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
});


class HeanCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heanCard: {
                cover: null,
                text: null,
                hasLiked: false,
                hasStarred: false,
                likeCount: 0,
                starCount: 0,
                commentCount: 0
            }
        }
    }

    // 渲染 heanCard，只需要传递 hId 进来即可，在此钩子中发出请求，收到响应前显示 loading，收到后显示 heanCard
    async componentWillMount() {
        const { uId, token, hId } = this.props;
        const response = await agent.hean.getHeanCard(uId, token, hId);
        if (response.rescode === 0)
            this.setState({ heanCard: response.heanCard })
    }
    
    render() {
        const { cover, text, hasLiked, hasStarred, likeCount, starCount, commentCount } = this.state.heanCard;
        if (!cover && !text)
            return null; // return loading... actually
        return (
            <React.Fragment>
                <View style={[theme.cardStyle, { borderRadius: 25 }]}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("HeanDetail", { heanCard: this.state.heanCard }) }>
                        <View style={{ padding: 10 }}>
                            <Image source={{ uri: cover }} style={theme.cardImageStyle} />
                        </View>
                        <View>
                            <Text style={[theme.cardContentStyle, { padding: 5, paddingLeft: 10 }]}>{text}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <AntDesign
                                    name={"like2"}
                                    size={20}
                                    color={hasLiked ? "red" : "black"}
                                />
                                <Text>{likeCount}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Feather
                                    name={"star"}
                                    size={20}
                                    color={hasStarred ? "red" : "black"}
                                />
                                <Text>{starCount}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <FontAwesome
                                    name={"comment-o"}
                                    size={20}
                                />
                                <Text>{commentCount}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeanCard);