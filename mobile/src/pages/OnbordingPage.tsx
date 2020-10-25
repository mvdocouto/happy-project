import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import Onboarding from "react-native-onboarding-swiper";

import { Feather } from "@expo/vector-icons";

interface DotProps {
  selected: any;
}
function CustomDot({ selected }: DotProps) {
  let backgroundColor;
  let width;

  backgroundColor = selected ? "#FFD152" : "#BECFD8";
  width = selected ? 16 : 8;

  return (
    <View
      style={{
        backgroundColor,
        width,
        height: 6,
        borderRadius: 4,
        marginLeft: 4,
      }}
    />
  );
}

function CustomButton({ ...props }) {
  return (
    <RectButton style={styles.createOrphanageButtom} {...props}>
      <Feather name="arrow-right" size={20} color="#15C3D6" />
    </RectButton>
  );
}



function FirstTitle(){
  return <Text style={styles.firstTitle}>Leve Felicidade para o mundo</Text>;
}

function FirstDescription() {
  return (
    <Text style={styles.firstDescription}>
      Visite orfanatos e mude o dia de muitas crianças
    </Text>
  );
}

function SecondDescription() {
  return (
    <Text style={styles.secondDescription}>
      Escolha um orfanato no mapa e faça sua visita
    </Text>
  );
}

function NextStep(navigation: any) {
  console.log('Call to function')
  AsyncStorage.setItem("showOnboarding", "false");
  navigation.navigate("OrphanageMap");
}

export default function OnboardingPage() {
  const navigation = useNavigation();

  return (
    <Onboarding
      NextButtonComponent={CustomButton}
      DoneButtonComponent={CustomButton}
      showSkip={false}
      bottomBarColor="#FFFFFF"
      DotComponent={CustomDot}
      onDone={() => NextStep(navigation)}
      pages={[
        {
          backgroundColor: "#FFFFFF",
          image: (
            <Image
              source={require("../images/globo.png")}
              style={styles.globoImage}
            />
          ),
          title: <FirstTitle />,
          subtitle: <FirstDescription />,
        },
        {
          backgroundColor: "#FFFFFF",
          image: (
            <Image
              source={require("../images/kids.png")}
              style={styles.kidsImage}
            />
          ),
          title: <SecondDescription />,
          subtitle: "",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  firstTitle: {
    position: "absolute",
    left: 10,
    top: 300,
    width: 200,
    marginTop: 0,
    marginLeft: 10,

    fontFamily: "Nunito_800ExtraBold",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 40,
    lineHeight: 48,
    color: "#0089A5",
  },

  firstDescription: {
    position: "absolute",
    left: 20,
    top: 500,
    width: 270,

    fontFamily: "Nunito_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 30,
    color: "#0089A5",
  },

  secondDescription: {
    position: "absolute",
    left: 65,
    top: 460,
    width: 270,

    fontFamily: "Nunito_800ExtraBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 30,
    lineHeight: 36,
    color: "#0089A5",
    textAlign: "right",
  },

  globoImage: {
    width: 230,
    height: 251,
    position: "absolute",
    bottom: 80,
  },

  kidsImage: {
    width: 265,
    height: 384,
    position: "absolute",
    bottom: -60,
  },

  createOrphanageButtom: {
    width: 46,
    height: 46,
    backgroundColor: "#D1EDF2",
    borderRadius: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
