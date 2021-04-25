import React, { useEffect, useState } from 'react';

import {
    FlatList,
    SafeAreaView,
    StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import { customStyles } from '../constants/Styles';

import { readFiles } from '../helpers/Storage';
import { Divider } from '../components/Divider';

export default function TrackListScreen(props) {

    const [dirs, setDirs] = useState([]);
    const [count, setCount] = useState(0);
    const handleFileRead = (data) => {
        setDirs(data);
        setCount(data.length);

    };

    useEffect(() => {
        readFiles(handleFileRead);
    }, []);

    const { navigation } = props;
    return (
        <SafeAreaView style={customStyles.mainContainer}>
            <View style={customStyles.container}>
                <View style={customStyles.headerRowBack}>
                    <View style={customStyles.flexEnd}>
                        <Text style={styles.header}>Recordings</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <Text>Total {count} Recording</Text>
                </View>
                <View >
                    <FlatList data={dirs}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AudioPlay', {
                                    skipTo: index, trackName: item.name
                                })} style={{ flex: 1 }}>
                                <Text style={[customStyles.textDark, styles.item,
                                { fontSize: 15 }]}>
                                    {item.name}
                                </Text>
                                <Divider />
                            </TouchableOpacity>)} />
                </View>
            </View>
        </SafeAreaView>
    );
    // }
}

const styles = StyleSheet.create({
    item: {
        margin: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: '500',
        alignSelf: 'center',
    },
});
