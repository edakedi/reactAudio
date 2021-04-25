import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Icon } from 'react-native-elements';
import { darkBlue, grey } from '../constants/Colors';

import HomeScreen from './HomeStackNavigator';
import SettingsScreen from './SettingsStackNavigator';

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    {
        defaultNavigationOptions: () => ({ headerShown: false }),
    }
);

HomeStack.navigationOptions = () => {
    var tabBarVisible = true;
    return {
        tabBarLabel: 'Record',
        tabBarOptions: {
            activeTintColor: '#000',
        },
        tabBarIcon: ({ focused }) => (
            <Icon name="play" type="feather"
                color={focused ? darkBlue : grey} />
        ),
        tabBarVisible
    };
};

const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
    },
    {
        defaultNavigationOptions: () => ({ headerShown: false }),
    }
);

SettingsStack.navigationOptions = () => {
    var tabBarVisible = true;
    return {
        tabBarLabel: 'Recordings',
        tabBarOptions: {
            activeTintColor: '#000',
        },
        tabBarIcon: ({ focused }) => (
            <Icon name="folder" type="feather"
                color={focused ? darkBlue : grey} />
        ),
        tabBarVisible
    };
};


const RootStack = createBottomTabNavigator(
    {
        HomeStack,
        SettingsStack
    },
    {
        unmountInactiveRoutes: true,
    }
);


export default createAppContainer(RootStack);
