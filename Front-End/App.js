import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import PredictionScreen from "./screens/PredictionScreen";
import UserScreen from "./screens/UserScreen";
import SignScreen from "./screens/SignScreen";
import SuggestionScreen from "./screens/SuggestionScreen";

// Create a stack navigator using the createNativeStackNavigator function from react-navigation.
const Stack = createNativeStackNavigator();

export default function App() {
  // Load custom fonts using Expo's useFonts hook.
  const [fontsLoaded] = useFonts({
    "Lato-Bold": require("./assets/Lato/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/Lato/Lato-Regular.ttf"),
  });

  // If fonts are not loaded yet, return null (render nothing).
  if (!fontsLoaded) {
    return null;
  }

  // Render the main application components wrapped in a NavigationContainer.
  return (
    <NavigationContainer
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      {/* Create a stack navigator to manage navigation between screens. */}
      <Stack.Navigator>
        {/* Define a screen named "Sign" and associate it with the SignScreen component. */}
        <Stack.Screen
          name="Sign"
          component={SignScreen}
          options={{ headerShown: false }} // Hide the header for this screen.
        />
        {/* Define a screen named "User" and associate it with the UserScreen component. */}
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={{ headerShown: false }} // Hide the header for this screen.
        />
        {/* Define a screen named "Prediction" and associate it with the PredictionScreen component. */}
        <Stack.Screen
          name="Prediction"
          component={PredictionScreen}
          options={{ headerShown: false }} // Hide the header for this screen.
        />
        {/* Define a screen named "Suggestion" and associate it with the SuggestionScreen component. */}
          <Stack.Screen
            name="Suggestion"
            component={SuggestionScreen}
            options={{ headerShown: false }} // Hide the header for this screen.
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
