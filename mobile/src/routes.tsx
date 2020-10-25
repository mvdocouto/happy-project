import React, { useEffect, useState } from "react";
import { NavigationContainer, useBackButton } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import OrphanageMap from "./pages/OrphanageMap";
import OrphanageMapInstructions from "./pages/OrphanageMapInstructions";
import OrphanageDetails from "./pages/OrphanageDetails";
import OnbordingPage from "./pages/OnbordingPage";

import OrphanageData from "./pages/CreateOrphanage/OrphanageData";
import SelectMapPosition from "./pages/CreateOrphanage/SelectMapPosition";
import Header from "./components/Header";

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem("showOnboarding").then((value) => {
      console.log("showOnboarding", value);
      if (value !== null) {
        setIsFirstLaunch(value);
      } else {
        setIsFirstLaunch(true);
      }
    });
  }, []);

  console.log("isFirstLaunch", isFirstLaunch);
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "#f2f3f5",
          },
        }}
      >
        {/* {isFirstLaunch ? (
          <Screen name="OnbordingPage" component={OnbordingPage} />
        ) : null} */}
        <Screen name="OnbordingPage" component={OnbordingPage} />
        <Screen
          name="OrphanageMapInstructions"
          component={OrphanageMapInstructions}
        />
        <Screen name="OrphanageMap" component={OrphanageMap} />
        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Orfanato" />,
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />,
          }}
        />
        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os dados" />,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
