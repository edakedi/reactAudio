import RecordAudio from '../screens/RecordAudio';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

export const HomeScreenStack = createStackNavigator(
    {
        RecordAudio: {
            screen: RecordAudio,
        },
    },
    {
        headerMode: 'none',
    }
);

export default createAppContainer(HomeScreenStack);
