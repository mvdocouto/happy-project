import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { AppLoading } from "expo";
 import Routes from './src/routes'

import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold
} from '@expo-google-fonts/nunito'

import mapMarker from './src/images/map-marker.png'

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded){
    return <AppLoading/>
  }
    return (
      <Routes/>
    );
}


