import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { View, Text, TouchableOpacity } from "react-native"

const tabNames = ["Explore", "Map", "MyInfo","CreateHean"]

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
        console.log("cntTab: " + cntTab)
        return (
            <React.Fragment>
                <View style={{ flexDirection: "row", justifyContent: "space-around", height: 50 }}>
                    {/* Explore */}
                    <TouchableOpacity onPress={() => this.navigateTo("Explore")}
                        style={{ borderWidth: 0, padding: 5, alignItems: "center" }}
                    >
                        <Ionicons name={"md-planet"} size={26} color={cntTab === "Explore" ? "cyan" : "grey"} />
                        <Text style={{ color: cntTab === "Explore" ? "cyan" : "grey" }}>发现</Text>
                    </TouchableOpacity>
                    
                    {cntTab === "Map" ?
                        // Map
                        <TouchableOpacity onPress={() => this.navigateTo("CreateHean")}
                            style={{
                                borderWidth: 0, height: 60, width: 60, borderRadius: 30, bottom: 20,
                                backgroundColor: "cyan",
                                justifyContent: "center", alignItems: "center"
                            }}
                        >
                            <FontAwesome name={"plus"} size={36} color={"white"} />
                        </TouchableOpacity> :
                        // CreateHean
                        <TouchableOpacity onPress={() => this.navigateTo("Map")}
                            style={{
                                borderWidth: 0, height: 60, width: 60, borderRadius: 30, bottom: 20,
                                backgroundColor: "cyan",
                                justifyContent: "center", alignItems: "center"
                            }}
                        >
                            <FontAwesome name={"map-marker"} size={36} color={"white"} />
                        </TouchableOpacity>
                    }
                    {/* MyInfo */}
                    <TouchableOpacity onPress={() => this.navigateTo("MyInfo")}
                        style={{ borderWidth: 0, padding: 5, alignItems: "center" }}
                    >
                        <FontAwesome name={"user"} size={26} color={cntTab === "MyInfo" ? "cyan" : "grey"} />
                        <Text style={{ color: cntTab === "MyInfo" ? "cyan" : "grey" }}>我的</Text>
                    </TouchableOpacity>

                </View>
            </React.Fragment>
        )
    }
}

export default BottomTabNavigator