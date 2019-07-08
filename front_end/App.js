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
