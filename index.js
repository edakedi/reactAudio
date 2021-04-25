/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerEventHandler(() => {
    return async (data) => {
        if (data.type == 'playback-state') {
            // Update the UI with the new state
        } else if (data.type == 'remote-play') {
            // The play button was pressed, we can forward this command to the player using
            TrackPlayer.play();
        } else if (data.type == 'remote-stop') {
            // The stop button was pressed, we can stop the player
            TrackPlayer.stop();
        } else if (data.type == 'remote-pause') {
            // The play button was pressed, we can forward this command to the player using
            TrackPlayer.pause();
        } else if (data.type == 'playback-state') {
            TrackPlayer.getState();
        } else if (data.type == 'remote-next') {
            TrackPlayer.skipToNext();
        } else if (data.type == 'remote-previous') {
            TrackPlayer.skipToPrevious();
        }
    };
});