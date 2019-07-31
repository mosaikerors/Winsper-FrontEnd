import React from 'react';
import { View, TouchableOpacity, Image, Text } from "react-native"
import journalBookCovers from "./journalBookCovers"

// 接受 journalBooks, cntJournalBookIndex, 以及一个回调函数
class JournalBooks extends React.Component {
    render() {
        const { journalBooks, cntJournalBookIndex } = this.props;
        return (
            <React.Fragment>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    {journalBooks.map((journalBook, index) => (
                        <TouchableOpacity onPress={() => this.props.handleCntIndexChange(index)}>
                            <Image
                                source={journalBookCovers[journalBook.coverId]}
                                style={[{ width: 140, height: 190, margin: 10 },
                                index === cntJournalBookIndex && { borderWidth: 2, borderColor: "cyan" }]}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ borderWidth: 0, alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>--{journalBooks[cntJournalBookIndex].name}--</Text>
                </View>
            </React.Fragment>
        )
    }
}

export default JournalBooks;