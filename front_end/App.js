import React, { Component } from 'react';
import { View, Modal,Text} from 'react-native';
import ImageViewer from "react-native-image-zoom-viewer";
import {Button, Overlay} from "react-native-elements";
export default class Main extends Component {
    state = {
        modalVisible: true,
        visible: false
    };
    render() {
        return (
            <View style={{padding: 10 }}>
                {/*<Modal*/}
                    {/*visible={this.state.modalVisible}*/}
                    {/*transparent={true}*/}
                {/*>*/}
                    {/*<ImageViewer*/}
                        {/*imageUrls={this.props.images}*/}
                        {/*index={this.props.index}*/}
                        {/*enableSwipeDown={true}*/}
                    {/*/>*/}
                {/*</Modal>*/}
                <Button title={"hello"} onPress={()=>{console.log("click!!!");this.setState({visible:true})}}/>
                {
                    this.state.visible && (
                        <Overlay isVisible>
                            <Text>Hello from Overlay!</Text>
                        </Overlay>
                    )
                }
            </View>
        );
    }
}