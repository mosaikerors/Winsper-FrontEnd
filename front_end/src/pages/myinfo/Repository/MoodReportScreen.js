import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Divider, ListItem } from 'react-native-elements'
import { connect } from "react-redux"
import theme from "../../../theme"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Loading from "../../../components/Loading"
import EmptyList from "../../../components/EmptyList"
import agent from "../../../agent/index"

const moodIcons = [
    <FontAwesome name={"smile-o"} size={28} color={theme.palette.sky[2]} />,
    <FontAwesome name={"meh-o"} size={28} color={theme.palette.sky[2]} />,
    <FontAwesome name={"frown-o"} size={28} color={theme.palette.sky[2]} />
]

const mapStateToProps = state => ({
    uId: state.user.uId,
    token: state.user.token
})

class MoodReportScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            moodReports: null,
            positiveNum: null,
            neutralNum: null,
            negativeNum: null,
            otherUId: this.props.navigation.getParam("otherUId", this.props.uId),
        }
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const { otherUId } = this.state
        const response = await agent.record.getMoodReportList(uId, token, otherUId)
        console.log(response)
        if (response.rescode === 0) {
            this.setState({
                moodReports: response.moodReports,
                positiveNum: response.positiveNum,
                neutralNum: response.neutralNum,
                negativeNum: response.negativeNum
            })
        }
    }

    render() {
        const { moodReports, positiveNum, neutralNum, negativeNum } = this.state;
        if (!moodReports)
            return <Loading />
        if (moodReports.length === 0)
            return <EmptyList field="心情报表列表" />
        return (
            <React.Fragment>
                <View style={{ backgroundColor: theme.palette.sky[0], flex: 1 }}>
                    <View style={{ borderWidth: 0, height: 40, flexDirection: "row", alignItems: "center" }}>
                        <View style={{ marginHorizontal: 10, flexDirection: "row", alignItems: "center" }}>
                            <FontAwesome name={"smile-o"} size={24} color={theme.palette.sky[2]} />
                            <Text style={{ fontSize: 24, marginLeft: 5, }}>{positiveNum}</Text>
                        </View>
                        <View style={{ marginHorizontal: 10, flexDirection: "row", alignItems: "center" }}>
                            <FontAwesome name={"meh-o"} size={24} color={theme.palette.sky[2]} />
                            <Text style={{ fontSize: 24, marginLeft: 5, }}>{neutralNum}</Text>
                        </View>
                        <View style={{ marginHorizontal: 10, flexDirection: "row", alignItems: "center" }}>
                            <FontAwesome name={"frown-o"} size={24} color={theme.palette.sky[2]} />
                            <Text style={{ fontSize: 24, marginLeft: 5, }}>{negativeNum}</Text>
                        </View>
                    </View>
                    <Divider />
                    <ScrollView style={{}}>
                        {moodReports.map((moodReport, index) => (
                            <View style={{ borderWidth: 0 }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.push("MoodReportDetail", { moodReportId: moodReport.moodReportId })}
                                >
                                    <ListItem
                                        containerStyle={{ backgroundColor: theme.palette.sky[0] }}
                                        key={index}
                                        leftIcon={moodIcons[moodReport.mood]}
                                        title={`${moodReport.year}  Week ${moodReport.week}`}
                                        titleStyle={{ fontSize: 20 }}
                                    />
                                    <Divider />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(MoodReportScreen);