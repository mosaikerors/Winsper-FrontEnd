import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image, StyleSheet, Platform
} from 'react-native';
import {
    getTheme
} from 'react-native-material-kit';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'stretch',
        padding: 20,
        marginTop: Platform.OS === 'android' ? 56 : 0,
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 7, marginRight: 7,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginTop: 10, marginBottom: 20,
    },
    legendLabel: {
        textAlign: 'center',
        color: '#666666',
        marginTop: 10, marginBottom: 20,
        fontSize: 12,
        fontWeight: '300',
    },
});

const theme = getTheme();

class HeanCard extends React.Component{
    render(){
        return(
            <View style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={theme.cardStyle}>
                        <Image source={{uri: this.props.src}} style={theme.cardImageStyle}/>
                        <Text style={theme.cardTitleStyle}>{this.props.title}</Text>
                        <View
                            style={{
                                padding: 15,
                            }}
                        >
                            <Text style={[theme.cardContentStyle, {padding: 0}]}>
                                {this.props.content}
                            </Text>
                        </View>
                        <View style={theme.cardActionStyle}>
                            <Action like={this.props.like} favorite={this.props.favorite}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

class Action extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={{flexDirection:"row"}}>
                <AntDesign
                    style={{flex:0.5}}
                    name={"like2"}/>
                <Text style={{flex:5}}>{this.props.like}</Text>
                <MaterialIcons
                    style={{flex:0.5}}
                    name={"favorite"}/>
                <Text>{this.props.favorite}</Text>
            </View>
        )
    }
}
export default HeanCard;