import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Divider } from "react-native-elements";
import { connect } from "react-redux";
import agent from "../../../agent/index";
import { transformDate } from "../../../util"
import Loading from "../../../components/Loading"
import FontAwesome from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({

});

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});

class DiaryDetailScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            diaryId: this.props.navigation.getParam("diaryId", 0),
            diary: null,
            isMe: this.props.navigation.getParam("isMe", false)
        }
        this.deleteDiary = this.deleteDiary.bind(this)
    }

    async deleteDiary() {
        const { uId, token } = this.props;
        const { diaryId } = this.state;
        const response = await agent.record.deleteDiary(uId, token, diaryId);
        this.props.navigation.pop();
    }

    async componentWillMount() {
        const { uId, token } = this.props;
        const { diaryId } = this.state;
        const response = await agent.record.getDiaryDetail(uId, token, diaryId);
        if (response.rescode === 0)
            this.setState({ diary: Object.assign({}, response, { time: transformDate(response.time, true) }) })

    }
    render() {
        const { diary, isMe } = this.state;
        if (!diary)
            return <Loading />;
        return (
            <React.Fragment>
                <ScrollView style={{ padding: 5 }}>
                    <View style={{ borderWidth: 0, margin: 15 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 48, flex: 1 }}>{diary.title}</Text>
                            {isMe &&
                                <TouchableOpacity style={{ margin: 10, borderWidth: 0, padding: 5 }} onPress={this.deleteDiary}>
                                    <FontAwesome
                                        name={"trash"}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                        <Divider />
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <View style={{ borderWidth: 0, flex: 1 }}>
                                <Text style={{ fontSize: 20 }}>{diary.username}</Text>
                            </View>
                            <View style={{ borderWidth: 0, flex: 2 }}>
                                <Text style={{ fontSize: 20 }}>{diary.time}</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 18 }}>{diary.text}</Text>
                        </View>
                    </View>
                </ScrollView>
            </React.Fragment>
        )
    }
}
export default connect(mapStateToProps)(DiaryDetailScreen);