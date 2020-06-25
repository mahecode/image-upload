/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text} from 'react-native';
import ImageUpload from './ImageUpload';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <ImageUpload />
    </View>
  );
};

export default App;
