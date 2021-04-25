import React from 'react';

import { View, StyleSheet } from 'react-native';


export class Divider extends React.PureComponent {
    render() {
        return (
            <View style={style.divider} />
        )
    }
}

const style = StyleSheet.create({
    divider: {
        borderBottomWidth: .2,
        borderBottomColor: 'blue',
    }
})