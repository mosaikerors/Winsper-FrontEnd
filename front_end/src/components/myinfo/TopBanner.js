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
        width: 70,
        height: 40
    }
})

class TopBanner extends React.Component {
    render() {
        return (
            <React.Fragment>
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
                        <Button containerStyle={[styles.attendance, styles.border]} title="签到" />
                    </View>
                </View>
            </React.Fragment>
        );
    }
}
export default TopBanner;