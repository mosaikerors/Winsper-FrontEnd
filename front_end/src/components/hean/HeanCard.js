import React from 'react';
import { Text, View, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTheme} from 'react-native-material-kit';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const theme = getTheme();

class HeanCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            commentCount:1000,
            likeCount:1000,
            favoriteCount:1000,
        }
    }
    render() {
        return (
            <View style={theme.cardStyle}>
                <Image source={{uri:this.props.hean.pics[0]}} style={theme.cardImageStyle} />
                <Text style={theme.cardContentStyle}>{this.props.hean.text}</Text>
                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <AntDesign
                            name={"like2"}
                            size={20}
                            color={"red"}
                        />
                        <Text>{10000}</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <MaterialIcons
                            name={"favorite"}
                            size={20}
                            color={"red"}
                        />
                        <Text>{10000}</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <FontAwesome
                            name={"comment-o"}
                            size={20}
                        />
                        <Text>{10000}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
export default HeanCard;