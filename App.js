/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import MainTabNavigator from './navigation/MainTabNavigator';

const App: () => React$Node = () => {
	return (
		<>
			<MainTabNavigator />
		</>
	);
};

export default App;
