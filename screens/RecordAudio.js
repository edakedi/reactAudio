import React, { Component } from 'react';
import {
    SafeAreaView, StyleSheet, View, Button,
    PermissionsAndroid
} from 'react-native';
import { Buffer } from 'buffer';

import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';

import { writeToExternalDisk } from '../helpers/Storage';
import { customStyles } from '../constants/Styles';


export default class App extends Component {
    sound = null;
    state = {
        audioFile: '',
        recording: false,
        loaded: false,
        paused: true
    };

    async componentDidMount() {
        const options = {
            sampleRate: 16000,
            channels: 1,
            bitsPerSample: 16,
            wavFile: 'recording.wav'
        };


        const grantedStorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Read/Write Permission',
                message: 'App needs storage access to read and write files',
            }
        ).catch(
            err => console.log(err)
        );

        const grantedRecording = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Recording Permission',
                message: 'App needs recording permission to record audio',
            }
        ).catch(
            err => console.log(err)
        );

        if (grantedStorage === PermissionsAndroid.RESULTS.GRANTED && grantedRecording === PermissionsAndroid.RESULTS.GRANTED) {

            console.log('All permissions granted');
        } else {
            BackHandler.exitApp();
            console.log('Permission denied');
        }

        AudioRecord.init(options);

        AudioRecord.on('data', data => {
            const chunk = Buffer.from(data, 'base64');
            console.log('chunk size', chunk.byteLength);
            // do something with audio chunk
        });
    }

    start = () => {
        this.setState({ audioFile: '', recording: true, loaded: false });
        AudioRecord.start();
    };

    stop = async () => {
        if (!this.state.recording) return;
        let audioFile = await AudioRecord.stop();
        writeToExternalDisk(audioFile);
        this.setState({ audioFile, recording: false });
    };

    load = () => {
        return new Promise((resolve, reject) => {
            if (!this.state.audioFile) {
                return reject('file path is empty');
            }

            this.sound = new Sound(this.state.audioFile, '', error => {
                if (error) {
                    console.log('failed to load the file', error);
                    return reject(error);
                }
                this.setState({ loaded: true });
                return resolve();
            });
        });
    };

    play = async () => {
        if (!this.state.loaded) {
            try {
                await this.load();
            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ paused: false });
        Sound.setCategory('Playback');

        this.sound.play(success => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            this.setState({ paused: true });
            // this.sound.release();
        });
    };

    pause = () => {
        this.sound.pause();
        this.setState({ paused: true });
    };

    render() {
        const { recording, paused, audioFile } = this.state;
        return (
            <SafeAreaView style={customStyles.mainContainer}>
                <View style={[customStyles.container, {
                    justifyContent: 'center',
                }]}>
                    <View style={styles.row}>
                        <Button onPress={this.start} title="Record" disabled={recording}
                            style={{ borderRadius: 10, overflow: 'hidden' }} />
                        <Button onPress={this.stop} title="Stop" disabled={!recording} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        backgroundColor: "gray",
        padding: 20,
        borderRadius: 10
    },
    buttonText: {
        color: "white"
    }
});
