import React, { useEffect, useState } from 'react';
import { Text, Button, View, Image, SafeAreaView, StyleSheet } from 'react-native';
import TrackPlayer, {
    TrackPlayerEvents,
    STATE_PLAYING,
} from 'react-native-track-player';
import {
    useTrackPlayerProgress,
    useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';
import { customStyles, screenHeight, screenWidth } from '../constants/Styles';
import { name as appName } from '../app.json';
import { Icon } from 'react-native-elements';

const songDetails = {
    id: '1',
    url:
        'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
    title: 'The Greatest Song',
    album: 'Great Album',
    artist: 'A Great Dude',
    artwork: 'https://picsum.photos/300',
};

const trackPlayerInit = async (allTrack) => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_JUMP_FORWARD,
            TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        ],
    });
    await TrackPlayer.add(allTrack);
    return true;
};

const App = (props) => {
    const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const [allTrack, setTrack] = useState([]);
    const [trackName, setTrackName] = useState([]);
    const { position, duration } = useTrackPlayerProgress(250);

    useEffect(() => {
        const startPlayer = async () => {
            let isInit = await trackPlayerInit(allTrack);
            setIsTrackPlayerInit(isInit);
        };
        startPlayer();
        console.log('all tracks');
    }, [allTrack]);

    //this hook updates the value of the slider whenever the current position of the song changes
    useEffect(() => {
        if (!isSeeking && position && duration) {
            setSliderValue(position / duration);
        }
    }, [position, duration]);

    useEffect(() => {
        var name = props.navigation.getParam('trackName', '');
        setTrackName(name);
        setTrack(
            {
                'id': `1`,
                'url': `file:///storage/emulated/0/${appName}/${name}`,
                title: 'abc',
                artist: '',
                'artwork': ''
            }
        );
    }, []);

    useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
        if (event.state === STATE_PLAYING) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    });

    const onButtonPressed = () => {
        if (!isPlaying) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
    };

    const slidingStarted = () => {
        setIsSeeking(true);
    };

    const slidingCompleted = async value => {
        await TrackPlayer.seekTo(value * duration);
        setSliderValue(value);
        setIsSeeking(false);
    };

    const _goBack = async () => {
        await TrackPlayer.stop();
        await TrackPlayer.destroy();
        const { goBack } = props.navigation;
        goBack();
    };

    // skip to next song
    const _skipToNext = async () => {
        try {
            await TrackPlayer.skipToNext();
            // await this.setTrackDetails();
        } catch (error) {
            console.log(error);
        }
    };

    // skip to previous song
    const _skipToPrevious = async () => {
        try {
            await TrackPlayer.skipToPrevious();
            // await this.setTrackDetails();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={customStyles.mainContainer}>
            <View style={customStyles.container}>
                <View style={customStyles.headerRowBack}>
                    <View style={styles.cancle}>
                        <Icon name="chevron-left" type="feather" onPress={_goBack} size={24}
                            iconStyle={customStyles.backBtn} />
                    </View>
                </View>
                <View style={customStyles.imageContainer}>
                    <Image
                        source={{
                            uri: songDetails.artwork,
                        }}
                        resizeMode="contain"
                        style={customStyles.albumImage}
                    />
                </View>
                <View style={customStyles.detailsContainer}>
                    <Text style={customStyles.songTitle}>{trackName}</Text>
                    <View style={customStyles.flexCol}>
                        <Text>{position}/{duration}</Text>
                    </View>
                </View>
                <View style={customStyles.controlsContainer}>
                    <Slider
                        style={customStyles.progressBar}
                        minimumValue={0}
                        maximumValue={1}
                        value={sliderValue}
                        minimumTrackTintColor="#111000"
                        maximumTrackTintColor="#000000"
                        onSlidingStart={slidingStarted}
                        onSlidingComplete={slidingCompleted}
                        thumbTintColor="#000"
                    />
                    <Button
                        title={isPlaying ? 'Pause' : 'Play'}
                        onPress={onButtonPressed}
                        style={{ width: '50%' }}
                        disabled={!isTrackPlayerInit}
                        color="#000000"
                    />
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {/* <TouchableOpacity onPress={_skipToPrevious} style={styles.playTouch}>
                        <View style={customStyles.badgeView}>
                            <Icon name={'skip-back'} size={20} reverse
                                type="feather" color={"#039BE5"} />
                        </View>
                    </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={_setUpPlayer} style={styles.playTouch}>
                        <View style={customStyles.badgeView}>
                            {badge}
                        </View>
                    </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={_skipToNext} style={styles.playTouch}>
                        <View style={customStyles.badgeView}>
                            <Icon name={'fast-forward'} size={20} reverse
                                type="feather" color={"#039BE5"} />
                        </View>
                    </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row'
    },
    mainImage: {
        borderRadius: 15,
        height: screenHeight / 4,
        resizeMode: 'cover',
        width: screenWidth / 2
    },
    audioTitle: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center'
    },
    cancle: {
        flex: .5,
        alignItems: 'flex-start'
    },
    playTouch: {
        flex: 1,
        flexDirection: 'column'
    }
});

export default App;

