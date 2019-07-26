import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Button, Avatar, Divider, Card } from 'react-native-elements'
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign"
import { ListItem } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
})

const list = ["账号与安全", "消息提醒"]

class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: '设置',
    };
    render() {
        return (
            <React.Fragment>
                <View>
                    {list.map((listItem, index) => (
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("AccountSafety")}>
                            <ListItem
                                key={index}
                                title={listItem}
                                rightIcon={<AntDesign name={"right"} />}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </React.Fragment>
        );
    }
}
export default (SettingsScreen);