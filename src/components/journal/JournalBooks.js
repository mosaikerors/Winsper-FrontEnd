import React from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions, Platform } from "react-native"
import Carousel from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from "react-redux"
import journalBookCovers from './journalBookCovers'
import agent from "../../agent/index"
import AwesomeAlert from 'react-native-awesome-alerts';
import theme from "../../theme"

const IS_IOS = Platform.OS === 'ios';


const mapStateToProps = state => ({
    token: state.user.token,
    uId: state.user.uId
});


// 接受 journalBooks, cntJournalBookIndex, 以及一个回调函数
class JournalBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            journalBookToBeDeleted: null,
            showDeleteAlert: false,
        }
        this.renderJournalBook = this.renderJournalBook.bind(this)
        this.deleteJournalBook = this.deleteJournalBook.bind(this);
    }

    async deleteJournalBook() {
        const { uId, token } = this.props;
        const { journalBookToBeDeleted } = this.state
        const response = await agent.record.deleteJournalBook(uId, token, journalBookToBeDeleted)
        this.setState({ journalBookToBeDeleted: null, showDeleteAlert: false })
        this.props.updateState()
    }

    renderJournalBook({ item }) {
        const { canLongPress } = this.props;
        const { journalBookId, name, coverId } = item;

        return (
            <TouchableOpacity
                style={{ height: 210, borderWidth: 0 }}
                onLongPress={canLongPress ? () => this.setState({ journalBookToBeDeleted: journalBookId }) : null}
            >
                <View style={{
                    flex: 1,
                    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
                }}>
                    <Image
                        source={journalBookCovers[coverId]}
                        style={{ height: 210, width: 150, borderRadius: 8 }}
                    />
                </View>
                <View style={[{
                    height: '22%', backgroundColor: 'white', borderBottomLeftRadius: 8, borderBottomRightRadius: 8,
                    position: "relative", top: 0, opacity: 0.7, width: 150, padding: 10
                }, canLongPress || { top: 0, width: 150 }]}>
                    <Text style={{ fontSize: 20 }}>{name}</Text>
                </View>
            </TouchableOpacity >
        );
    }
    render() {
        const { journalBooks, cntJournalBookIndex, sliderWidth, canLongPress } = this.props;
        const { journalBookToBeDeleted } = this.state;
        return (
            <React.Fragment>
                <View style={[{ borderWidth: 0, }, canLongPress && { backgroundColor: theme.palette.sky[0] }]}>
                    <Carousel
                        data={journalBooks}
                        renderItem={this.renderJournalBook}
                        sliderWidth={sliderWidth}
                        itemWidth={180}
                        firstItem={cntJournalBookIndex}
                        inactiveSlideScale={0.9}
                        inactiveSlideOpacity={0.7}
                        onSnapToItem={(index) => this.props.snapTo(index)}
                    />
                </View>
                <View style={{
                    flexDirection: "row", display: journalBookToBeDeleted ? "flex" : "none",
                    borderWidth: 0, justifyContent: "center"
                }}>
                    <TouchableOpacity
                        onPress={() => this.setState({ journalBookToBeDeleted: null })}
                        style={{ position: "relative", right: 30, borderWidth: 0 }}
                    >
                        <FontAwesome name="close" size={28} style={{ margin: 5 }} color={theme.palette.sky[2]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ showDeleteAlert: true })}>
                        <FontAwesome name="trash" size={28} style={{ margin: 5 }} color="red" />
                    </TouchableOpacity>
                </View>
                <AwesomeAlert
                    show={this.state.showDeleteAlert}
                    title="确认要删除吗？"
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="取消"
                    confirmText="确认"
                    onCancelPressed={() => this.setState({ showDeleteAlert: false })}
                    onConfirmPressed={this.deleteJournalBook}
                    cancelButtonStyle={{ marginRight: 30 }}
                    confirmButtonColor="#DD6B55"
                />
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps)(JournalBooks);