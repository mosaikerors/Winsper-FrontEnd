
// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     View
// } from 'react-native';
//
// export default class ReactNativeProject extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//
//                 <View style={styles.viewItem1}>
//                     <View style={{flex:1,height:40,backgroundColor:'red'}}></View>
//                     <View style={{flex:1,height:40,backgroundColor:'blue',alignSelf:'center'}}></View>
//                     <View style={{flex:1,height:40,backgroundColor:'red',alignSelf:'flex-end'}}></View>
//                 </View>
//
//                 <View style={styles.viewItem2}>
//                     <View style={styles.viewItem2Child1}>
//                     </View>
//                     <View style={styles.viewItem2Child2}>
//                     </View>
//                 </View>
//
//                 <View style={styles.viewItem3}>
//                     <View style={styles.viewItem3Child1}>
//                     </View>
//                     <View style={styles.viewItem3Child2}>
//                     </View>
//                     <View style={styles.viewItem3Child3}>
//                     </View>
//                 </View>
//
//                 <View style={{flex:2,backgroundColor:'#bbceee',flexDirection:'row'}}>
//                     <View style={{flex:1,height:100,flexDirection:'row',justifyContent:'center',marginTop:30}}>
//                         <View style={{width:100,backgroundColor:'red'}}></View>
//                         <View style={{width:70,backgroundColor:'blue'}}></View>
//                     </View>
//                 </View>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     viewItem1:{
//         flex:1,
//         flexDirection:'row',
//         height:50,
//         backgroundColor:'#FF33CC'
//     },
//     viewItem2:{
//         flex:1,
//         flexDirection:'row',
//         height:50,
//         marginTop:15,
//         backgroundColor:'#00FFFF',
//
//         flexWrap:'wrap'
//     },
//     viewItem2Child1:
//         {
//             width:200,
//             height:30,
//             backgroundColor:'green'
//         },
//     viewItem2Child2:
//         {
//             width:200,
//             height:30,
//             backgroundColor:'red'
//         },
//     viewItem3:{
//         flex:1,
//         flexDirection:'row',
//         height:50,
//         backgroundColor:'#CCBBFF'
//     },
//     viewItem3Child1:{
//         flex:1,
//         backgroundColor:'#00ffbb'
//     },
//     viewItem3Child2:{
//         flex:1,
//         backgroundColor:'#aabbdd'
//     },
//     viewItem3Child3:
//         {
//             flex:1,
//             backgroundColor:'#0000ff'
//         }
// });