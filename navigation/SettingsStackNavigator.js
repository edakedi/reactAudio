
import TrackListScreen from '../screens/TrackListScreen';
import AudioPlay from '../screens/AudioPlay';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

export const SettingsScreenStack = createStackNavigator(
    {
        TrackListScreen: {
            screen: TrackListScreen,
        },
        AudioPlay: {
            screen: AudioPlay,
        },
    },
    {
        headerMode: 'none',
    }
);

export default createAppContainer(SettingsScreenStack);