import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements'
import HeanCard from "../../../components/common/HeanCard";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";

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

class HeanListScreen extends React.Component {
    static navigationOptions = {
        title: "我的函"
    };
    render() {
        return (
            <React.Fragment>
                <FlatList
                    data={[{ key: 1 }, { key: 1 }, { key: 1 }]}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={{ height: 400 }} onPress={() => this.props.navigation.navigate("HeanDetail", { index })}>
                            <View style={{ height: "100%", borderWidth: 1 }}><HeanCard /></View>

                        </TouchableOpacity>
                    )}
                />
                {/*<View style={{ borderWidth: 1, flex: 1 }}>
                    <TouchableOpacity style={{ height: "100%" }} onPress={() => this.props.navigation.navigate("HeanDetail")}>
                        <HeanCard />
                    </TouchableOpacity>
                    </View>*/}
            </React.Fragment>
        );
    }
}
export default HeanListScreen;