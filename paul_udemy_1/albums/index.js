
/** @format */
// Import a library to create a new Component
import React from 'react';
import { Text, AppRegistry } from 'react-native';

import Header from './src/components/Header'

// Create a component
const App = () =>  (
    <Header />
);
// Render a component

AppRegistry.registerComponent('albums', () => App);