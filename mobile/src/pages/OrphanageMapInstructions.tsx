import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

export default function OrphanageMapInstructions() {
  const navigation = useNavigation();

  function handleNavagationSelectMapPosition() {
    navigation.navigate("SelectMapPosition");
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.8805009,
          longitude: -43.339121,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      ></MapView>
      <View style={styles.instructions}>
        <RectButton
          style={styles.buttonContainer}
          onPress={handleNavagationSelectMapPosition}
        >
          <Image
            source={require("../images/cursor.png")}
          />
          <Text style={styles.buttonText}>
            Toque no mapa para adicionar um orfanato
          </Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  instructions: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(21, 214, 214, 0.7)",
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    width: 203,
    height: 246,
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 24,
    lineHeight: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
