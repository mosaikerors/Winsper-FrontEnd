import React from 'react';
import { Text, View, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTheme } from 'react-native-material-kit';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import agent from "../../agent"
import { TouchableOpacity } from 'react-native-gesture-handler';
import myTheme from "../../theme"

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
        this.updateState = this.updateState.bind(this);
    }

    async updateState() {
        const { uId, token, hId } = this.props;
        const response = await agent.hean.getHeanCard(uId, token, hId);
        if (response.rescode === 0)
            this.setState({ heanCard: Object.assign({}, response.heanCard, { hasStarred: response.heanCard.hasStared }) })
    }

    componentWillMount() {
        this.updateState();
    }

    componentWillReceiveProps() {
        this.updateState();
    }

    render() {
        const { cover, text, hasLiked, hasStarred, likeCount, starCount, commentCount } = this.state.heanCard;
        if (!cover && !text)
            return null; // return loading... actually
        return (
            <React.Fragment>
                <View style={[theme.cardStyle, { borderRadius: 25, borderColor: myTheme.palette.sky[0], backgroundColor: myTheme.palette.sky[0] }]}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.push("HeanDetail", { heanCard: this.state.heanCard })}
                        disabled={this.props.whenSubmission}
                    >
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
                                    color={hasLiked ? myTheme.palette.sky[2] : "black"}
                                />
                                <Text>{likeCount}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Feather
                                    name={"star"}
                                    size={20}
                                    color={hasStarred ? myTheme.palette.sky[2] : "black"}
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