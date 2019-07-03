import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Avatar } from 'react-native-elements'

const styles = StyleSheet.create({
    border: {
        //borderWidth:1,
    },
    username: {
        marginTop: 22,
        marginLeft: 8,
        padding: 10,
        paddingBottom: 6,
        fontSize: 24,
        fontWeight: 'bold',
        borderStyle: 'solid',
        //borderWidth: 1,
    },
    feather: {
        marginLeft: 12,
        padding: 10,
        paddingTop: 6,
        //borderWidth:1
    },
    attendance: {
        marginTop: 46,
        marginRight: 34,
        //width: 70,
        height: 40
    },
    checked: {
        width: 90
    },
    unchecked: {
        width: 70
    }
})

class TopBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,  //是否签到
        }
    }
    render() {
        return (
            <z>
                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                    <Avatar
                        rounded
                        size="large"
                        icon={{ name: 'user', color: 'orange', type: 'font-awesome' }}
                        overlayContainerStyle={{ backgroundColor: 'cyan', flex: 4, borderWidth: 1 }}
                        //onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        containerStyle={{ marginTop: 25, marginLeft: 25, borderWidth: 1 }}
                        showEditButton
                    />
                    <View style={{ flexDirection: 'column' }}>
                        <Text
                            style={[styles.username, styles.border]}
                        >
                            Gusabary
                        </Text>
                        <Text
                            style={[styles.feather, styles.border]}
                        >
                            羽毛：8
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row-reverse', flex: 1 }}>
                        {this.state.checked ? (
                            <Button containerStyle={[styles.attendance, styles.border,styles.checked]}
                                title="已签到"
                                onPress={() => this.setState({ checked: false })}
                                icon={{ name: "check" }}
                            />
                        ) : (
                                < Button containerStyle={[styles.attendance, styles.border,styles.unchecked]}
                                    title="签到"
                                    onPress={() => this.setState({ checked: true })}
                                />
                            )
                        }
                    </View>
                </View>
            </z>
        );
    }
}
export default TopBanner;