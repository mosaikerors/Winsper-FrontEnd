import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { View, Text, TouchableOpacity } from "react-native"
import theme from "../theme"

const tabNames = ["Explore", "Map", "MyInfo", "CreateHean"]

class BottomTabNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cntTab: tabNames[this.props.navigation.state.index]
        }
        this.navigateTo = this.navigateTo.bind(this);
    }

    navigateTo(tab) {
        this.setState({ cntTab: tab })
        this.props.navigation.navigate(tab)
    }

    render() {
        const { cntTab } = this.state;
        return (
            <React.Fragment>
                <View style={{
                    flexDirection: "row", justifyContent: "space-around", height: 50,
                    backgroundColor: cntTab === "Map" ? theme.palette.sky[0] : theme.palette.sky[1]
                }}>
                    {/* Explore */}
                    <TouchableOpacity onPress={() => this.navigateTo("Explore")}
                        style={{ borderWidth: 0, padding: 5, alignItems: "center" }}
                    >
                        <Ionicons name={"md-planet"} size={26} color={cntTab === "Explore" ? theme.palette.sky[2] : "grey"} />
                        <Text style={{ color: cntTab === "Explore" ? theme.palette.sky[2] : "grey" }}>发现</Text>
                    </TouchableOpacity>

                    {/* Map */}
                    <TouchableOpacity onPress={() => this.navigateTo("Map")}
                        style={{
                            borderWidth: 0, height: 60, width: 60, borderRadius: 30, bottom: 20,
                            backgroundColor: cntTab === "Map" ? theme.palette.sky[1] : theme.palette.sky[2],
                            justifyContent: "center", alignItems: "center"
                        }}
                    >
                        <FontAwesome name={"map-marker"} size={36} color={"white"} />
                    </TouchableOpacity>

                    {/* MyInfo */}
                    <TouchableOpacity onPress={() => this.navigateTo("MyInfo")}
                        style={{ borderWidth: 0, padding: 5, alignItems: "center" }}
                    >
                        <FontAwesome name={"user"} size={26} color={cntTab === "MyInfo" ? theme.palette.sky[2] : "grey"} />
                        <Text style={{ color: cntTab === "MyInfo" ? theme.palette.sky[2] : "grey" }}>我的</Text>
                    </TouchableOpacity>

                </View>
            </React.Fragment >
        )
    }
}

export default BottomTabNavigator