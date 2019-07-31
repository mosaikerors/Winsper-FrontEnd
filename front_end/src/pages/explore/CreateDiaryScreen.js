import React from 'react';
import { connect } from "react-redux";
import { Text, TextInput, View, TouchableOpacity } from "react-native"
import { Divider } from "react-native-elements"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import agent from "../../agent/index"

const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});


class CreateDiaryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: ''
        }
        this.handleOk = this.handleOk.bind(this)
    }

    async handleOk() {
        const { uId, token } = this.props;
        const { title, text } = this.state;
        const response = await agent.record.createDiary(uId, token, title, text)
        if (response.rescode === 0)
            this.props.navigation.pop()
    }
    render() {
        return (
            <React.Fragment>
                <View style={{ margin: 5 }}>
                    <View style={{ flexDirection: "row" }}>
                        <TextInput
                            placeholder="日记标题"
                            style={{ fontSize: 36, borderWidth: 0, flex: 1 }}
                            value={this.state.title}
                            onChangeText={(title) => this.setState({ title })}
                        />
                        <TouchableOpacity style={{ borderWidth: 0, justifyContent: "center" }}
                            onPress={this.handleOk}
                        >
                            <FontAwesome name="check" size={28} style={{ margin: 10 }} color="green" />
                        </TouchableOpacity>
                    </View>
                    <Divider />
                    <TextInput
                        placeholder="日记正文"
                        multiline
                        style={{ fontSize: 16, height: "100%", textAlignVertical: "top" }}
                        value={this.state.text}
                        onChangeText={(text) => this.setState({ text })}
                    />
                </View>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps)(CreateDiaryScreen);