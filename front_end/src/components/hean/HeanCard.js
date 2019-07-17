import React from 'react';
import { Text, View, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getTheme} from 'react-native-material-kit';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

const theme = getTheme();

class HeanCard extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={theme.cardStyle}>
                <Image source={{uri:this.props.hean.cover}} style={theme.cardImageStyle} />
                <Text style={theme.cardContentStyle}>{this.props.hean.text}</Text>
                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <AntDesign
                            name={"like2"}
                            size={20}
                            color={this.props.hean.hasLiked ?"red":"black"}
                        />
                        <Text>{this.props.hean.likeCount}</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Feather
                            name={"star"}
                            size={20}
                            color={this.props.hean.hasStarred ?"red":"black"}
                        />
                        <Text>{this.props.hean.starCount}</Text>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <FontAwesome
                            name={"comment-o"}
                            size={20}
                        />
                        <Text>{this.props.hean.commentCount}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
export default HeanCard;