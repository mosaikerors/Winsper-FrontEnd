import React from 'react';
import { connect } from "react-redux";
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { Divider, Button, Input } from "react-native-elements"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import agent from "../../agent/index"
import AntDesign from "react-native-vector-icons/AntDesign"
import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import HeanCard from "../../components/hean/HeanCard"

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});


class PostSubmissionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hId: null,
            reason: null,
            submitOK: false
        }
        this.submit = this.submit.bind(this)
    }

    async submit() {
        const { uId, token } = this.props;
        const { hId, reason } = this.state;
        const response = await agent.hean.postSubmissions(uId, token, hId, reason);
        if (response.rescode === 0)
            this.setState({ submitOK: true })
    }

    componentWillReceiveProps(nextProps) {
        // if you will reach this page, grab newest data
        if (nextProps.isFocused) {
            this.setState({ hId: this.props.navigation.getParam("hId", null) })
        }

    }

    render() {
        const { hId, reason } = this.state;
        return (
            <React.Fragment>
                <KeyboardAvoidingView behavior="position">
                    <View style={{ height: 280, borderWidth: 1, padding: 10, margin: 10, borderRadius: 20 }}>
                        {!hId ?
                            <TouchableOpacity
                                style={{ borderWidth: 0, flex: 1, justifyContent: "center", alignItems: "center" }}
                                onPress={() => this.props.navigation.push("SelectHean")}
                            >
                                <AntDesign name={"plus"} size={40} />
                                <Text style={{ marginTop: 5 }}>点击以选择一封函</Text>
                            </TouchableOpacity> :
                            <HeanCard hId={hId} whenSubmission={true} />
                        }
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                        <Input
                            placeholder="选择这封函的原因是..."
                            value={reason}
                            onChangeText={reason => this.setState({ reason })}
                            inputContainerStyle={{ borderWidth: 1, borderRadius: 20 }}
                            multiline
                            numberOfLines={3}
                        />
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        {!this.state.submitOK ?
                            <Button
                                title="确认"
                                onPress={this.submit}
                                buttonStyle={{ width: 90, height: 50, marginTop: 20, borderRadius: 50, }}
                                titleStyle={{ fontSize: 20 }}
                            />
                            :
                            <Button
                                icon={<FontAwesome name="check" size={15} color="white" style={{ margin: 5 }} />}
                                title="投稿成功"
                                buttonStyle={{ width: 120, height: 50, marginTop: 20, borderRadius: 50, }}
                                titleStyle={{ fontSize: 20 }}
                            />
                        }
                    </View>
                </KeyboardAvoidingView>
            </React.Fragment>
        )
    }
}

export default withNavigationFocus(connect(mapStateToProps)(PostSubmissionScreen));