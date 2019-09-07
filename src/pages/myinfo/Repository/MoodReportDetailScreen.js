import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { Divider, Image } from 'react-native-elements'
import { connect } from "react-redux"
import theme from "../../../theme"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Loading from "../../../components/Loading"
import EmptyList from "../../../components/EmptyList"
import agent from "../../../agent/index"

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
})

const backgroundImage = require("../../../../images/moodReport.jpg")

class MoodReportDetailScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            moodReportId: this.props.navigation.getParam("moodReportId", 0),
            moodReport: null,
        }
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const { moodReportId } = this.state;
        const response = await agent.record.getMoodReportDetail(uId, token, moodReportId)
        if (response.rescode === 0) {
            this.setState({ moodReport: response.moodReport })
        }
    }

    render() {
        const { moodReport } = this.state;
        if (!moodReport)
            return <Loading />
        const { year, week, heanNum, keyword, mood, image, poem } = this.state.moodReport
        return (
            <React.Fragment>
                <ImageBackground source={backgroundImage} style={{ width: '100%', height: '100%', opacity: 0.8 }}>
                    <View style={{ margin: 10, flexDirection: "row" }}>
                        <Text style={{ fontSize: 36, borderWidth: 0, flex: 1 }}>{`${year} 年 第 ${week} 周`}</Text>
                        <TouchableOpacity
                            style={{ borderWidth: 0, alignItems: "center", justifyContent: "center", padding: 5 }}
                            onPress={() => this.props.navigation.pop()}
                        >
                            <FontAwesome name={"check"} size={28} color="green" />
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ backgroundColor: "black" }} />
                    <View style={{ margin: 10, marginLeft: 20 }}>
                        <Text style={{ fontSize: 24 }}>这一周你写了<Text style={{ color: theme.palette.sky[3] }}> {heanNum} </Text>封函</Text>
                    </View>
                    <View style={{ borderWidth: 0, height: 80, alignItems: "center", flexDirection: "row" }}>
                        <View style={{ flex: 1, alignItems: "flex-end", marginRight: 5 }}>
                            <Text style={{ fontSize: 24 }}>关键词是</Text>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ fontSize: 60, color: theme.palette.sky[3] }}>{keyword}</Text>
                        </View>
                    </View>
                    <View style={{ margin: 10, flexDirection: "row", borderWidth: 0, justifyContent: "center" }}>
                        <Text style={{ fontSize: 24 }}>我们根据这些函生成了一张图片</Text>
                        <FontAwesome name={"hand-o-down"} size={24} style={{ margin: 3 }} />
                    </View>
                    <View style={{ margin: 10, alignItems: "center", borderWidth: 0, height: 200 }}>
                        <View style={{ height: 200, width: 200, borderWidth: 0 }}>
                            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", alignItems: "flex-start" }}>
                                <View style={{
                                    height: 30, width: 30, borderLeftWidth: 2, borderTopWidth: 2,
                                    position: "relative", bottom: 15, right: 15, borderColor: theme.palette.sky[3]
                                }} />
                                <View style={{
                                    height: 30, width: 30, borderRightWidth: 2, borderTopWidth: 2,
                                    position: "relative", bottom: 15, left: 15, borderColor: theme.palette.sky[3]
                                }} />
                            </View>
                            <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", alignItems: "flex-end" }}>
                                <View style={{
                                    height: 30, width: 30, borderLeftWidth: 2, borderBottomWidth: 2,
                                    position: "relative", top: 15, right: 15, borderColor: theme.palette.sky[3]
                                }} />
                                <View style={{
                                    height: 30, width: 30, borderRightWidth: 2, borderBottomWidth: 2,
                                    position: "relative", left: 15, top: 15, borderColor: theme.palette.sky[3]
                                }} />
                            </View>
                        </View>
                        <Image source={{ uri: image }} style={{ height: 200, width: 200, position: 'relative', bottom: 200 }} />
                    </View>
                    <View style={{ margin: 10, flexDirection: "row", borderWidth: 0, justifyContent: "flex-end" }}>
                        <Text style={{ fontSize: 24 }}>还有一句诗</Text>
                        <FontAwesome name={"hand-o-down"} size={24} style={{ margin: 3 }} />
                    </View>
                    <View style={{ margin: 10, justifyContent: "center", borderWidth: 0, height: 100, borderWidth: 0, flexDirection: "row" }}>
                        <Text style={{ fontSize: 40, color: theme.palette.sky[3] }}>{poem.slice(0, 5)}  </Text>
                        <Text style={{ fontSize: 40, color: theme.palette.sky[3] }}>{poem.slice(6, 11)}</Text>
                    </View>
                </ImageBackground>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(MoodReportDetailScreen);