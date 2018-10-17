
/** @format */
// Import a library to create a new Component
import React from 'react';
import { Text, AppRegistry, View } from 'react-native';

import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';

// http://rallycoding.herokuapp.com/api/music_albums

// Create a component
const App = () =>  (
    <View style={{ flex: 1 }}>
        <Header headerText={'Albums!'} />
        <AlbumList />
    </View>
);
// Render a component

AppRegistry.registerComponent('albums', () => App);