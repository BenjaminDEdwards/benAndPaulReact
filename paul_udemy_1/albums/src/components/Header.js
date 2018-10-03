// import libraries
import React from 'react';
import { Text } from 'react-native';

// make component
const Header = () => {
    const { textStyle } = styles;
    return <Text style={textStyle}>Albums!</Text>;
};

const styles = {
    textStyle: {
        fontSize: 20
    }
};

// make component avalible to other parts of the app
export default Header;