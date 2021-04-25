import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';

import { formatTime } from '../constants/Logic';

export class ProgressBar extends ProgressComponent {
    constructor(props) {
        super();
    }

    render() {
        console.log(this.props.position, this.props.duration);
        const position = formatTime(Math.floor(this.props.position));
        const duration = formatTime(Math.floor(this.props.duration));
        const info = position + ' / ' + duration;

        let progress = this.getProgress() * 100;
        let buffered = this.getBufferedProgress() * 100;
        buffered -= progress;
        if (buffered < 0) buffered = 0;
        console.log(info);
        return (
            <View style={styles.view}>
                <View style={{ flexDirection: "row", }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.info}>{info}</Text>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: '100%',
    },
    info: {
        color: '#607D8B',
        fontSize: 16,
        fontWeight: '300',
        margin: 10
    },
    bar: {
        backgroundColor: '#575757',
        height: 5,
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    played: {
        backgroundColor: '#03A9F4',
        height: 5
    },
    buffered: {
        backgroundColor: '#797979',
        height: 5
    }
});