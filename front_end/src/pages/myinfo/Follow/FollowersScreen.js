import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements'

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
    },
})

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    }
];

class FollowersScreen extends React.Component {
    static navigationOptions = {
        title: '我的粉丝',
    };
    render() {
        return (
            <React.Fragment>
                <View>
                    {list.map((listItem,index) => (
                        <ListItem
                            key={index}
                            leftAvatar={{ source: { uri: listItem.avatar_url } }}
                            title={listItem.name}
                            subtitle={listItem.subtitle}
                        />
                    ))}
                </View>
            </React.Fragment>
        );
    }
}
export default FollowersScreen;