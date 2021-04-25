import React from 'react';

import {
    BackHandler,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';


import { PermissionsAndroid } from 'react-native';

import { customStyles } from '../constants/Styles';
import { ScrollView } from 'react-native-gesture-handler';
import { getRequest } from '../utils/utils';
import { GET_PLAYLISTS, GET_TRACKS } from '../constants/Urls';

import { makeDirectory, downloadTrack } from '../helpers/Storage';
import { Divider } from '../components/Divider';

export default class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            token: '',
            isLoading: true,
            playlists_data: [],
            dirName: ''
        };
    }

    handleResponse = (data) => {
        this.setState({ isLoading: false });
        if (data.header.status === '1') {
            this.setState({
                'playlists_data': data.body,
                'error': ''
            });
            const { navigate } = this.props.navigation;
            navigate('HomeScreen');
        } else {
            this.setState({ 'error': 'Email or password is incorrect' });
        }
    };

    syncDirectory = (dirName, dirId) => {
        this.setState({ dirName: dirName });
        makeDirectory(dirName);
        this.getTracks(dirId);
    };

    downloadTrack = (trackURL, fileName, dirName) => {
        downloadTrack(trackURL, fileName, dirName);
    };

    getTracks = async (profileID) => {
        var URL = GET_TRACKS + profileID;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + this.state.token,
        };
        getRequest(URL, this.handleTracks, headers);
    };

    handleTracks = (data) => {
        var results = data.body;
        (results).map((item) => {
            downloadTrack(item['download_url'], item['ori_filename'], this.state.dirName);
        });
    };

    async componentDidMount() {

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Read/Write Permission',
                message: 'App needs storage access to read and write files ',
            }
        ).catch(
            err => console.log(err)
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission granted');
        } else {
            BackHandler.exitApp();
            console.log('Storage Permission Denied.');
        }
    }

    render() {
        const { navigation } = this.props;
        const isLoading = this.state.isLoading;
        const playlists = this.state.playlists_data;
        return (
            <SafeAreaView style={customStyles.mainContainer}>
                <ScrollView>
                    <View style={customStyles.container}>
                        <View style={customStyles.headerRowBack}>
                            <View style={customStyles.flexEnd}>
                                <Text style={styles.header}>Playlist</Text>
                            </View>
                        </View>
                        <View >
                            {isLoading
                                ? <ActivityIndicator size="large" color="#0000ff" />
                                : <FlatList data={playlists}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => navigation.push('TrackList', {
                                                dirId: item.id,
                                                dirName: item.name,
                                            })} style={{ flex: 1 }}>
                                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                                <View style={{
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'flex-start',
                                                    flex: 1
                                                }}>
                                                    <Text>{item.id}{item.name}</Text>
                                                    <Text style={[customStyles.textDark, styles.item]}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    alignItems: 'flex-end',
                                                    justifyContent: 'flex-end',
                                                }}>
                                                    <TouchableOpacity onPress={() => this.syncDirectory(item.name, item.id)}>
                                                        <Text style={[customStyles.textDark, styles.item,
                                                        { borderColor: 'blue', borderWidth: 1, color: 'blue', padding: 5, fontSize: 14, borderRadius: 2 }]}>
                                                            Sync
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <Divider />
                                        </TouchableOpacity>)} />
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
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
