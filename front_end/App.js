<<<<<<< HEAD
// import ImageViewer from "react-native-image-zoom-viewer";
// import React, { Component } from "react";
// import { Modal, View, TouchableOpacity } from "react-native";
// import ImageGroup from './src/components/common/ImageGroup'
// export default class ModalExample extends Component {
//     state = {
//         modalVisible: false
//     };
//     setModalVisible(visible) {
//         this.setState({ modalVisible: visible });
//     }
//     render() {
//         return (
//             <View style={{ marginTop: 22 }}>
//                 <Modal
//                     animationType="none"
//                     transparent={false}
//                     visible={this.state.modalVisible}
//                     onRequestClose={
//                         () => {
//                             this.setModalVisible(!this.state.modalVisible);
//                         }
//                     }
//                 >
//                     <ImageViewer
//                         imageUrls={images}
//                         index={this.state.index}
//                         enableSwipeDown={true}
//                     />
//                 </Modal>
//                 <TouchableOpacity onPress={()=>{this.setModalVisible(!this.state.modalVisible);}}>
//                     <ImageGroup
//                         images={images}
//                         length={3}
//                     />
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }
//
// const images = [{
//     url:"https://fallbacks.carbonads.com/nosvn/fallbacks/f1942942caa6a76bc03b04f9aadd6e0d.png"
// },
//     {
//         url:"https://fallbacks.carbonads.com/nosvn/fallbacks/f1942942caa6a76bc03b04f9aadd6e0d.png"
//     },{
//         url:"https://fallbacks.carbonads.com/nosvn/fallbacks/f1942942caa6a76bc03b04f9aadd6e0d.png"
//     }];
import {Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
export default class TouchableImage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <Image style={this.props.style} source={this.props.source}/>
            </TouchableOpacity>
        )
    }
}
=======
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class FlatListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <TouchableOpacity><Text style={styles.item}>{item.key}</Text></TouchableOpacity>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
>>>>>>> 5b7423bc5608ee207194b5c7f54b903bd15d7af2
