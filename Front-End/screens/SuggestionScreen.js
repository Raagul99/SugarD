import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { styles } from "./styles";

export default function SuggestionScreen({ route, navigation }) {
  // Destructure parameters from route
  const { username, email, contactNumber, bloodType, typePrediction } =
    route.params;

  // Suggestions for different diabetes types
  const type1Suggestions = [
    "Count carbs, balance with insulin.",
    "Choose whole grains, lean proteins.",
    "Limit sugary foods.",
    "Monitor blood sugar regularly..",
    "Consistent meal timing.",
    "150 mins weekly aerobic activity.",
    "Strength training 2x/week.",
    "Carry glucose during workouts.",
    "Check blood sugar before, after.",
    "Listen to body for adjustments.",
  ];

  const type2Suggestions = [
    "Portion control, mindful eating.",
    "High-fiber foods, veggies.",
    "Limit added sugars, processed foods.",
    "Monitor blood sugar.",
    "Plan balanced meals.",
    "150 mins weekly aerobic exercise.",
    "Resistance training 2x/week.",
    "Post-meal walks reduce spikes.",
    "Check blood sugar regularly.",
    "Consult with healthcare team.",
  ];

  const gestationalSuggestions = [
    "Carbs in moderation.",
    "Balanced meals, snacks.",
    "Monitor blood sugar.",
    "Include healthy fats, proteins.",
    "Consult dietitian.",
    "30 mins daily, gentle activity.",
    "Avoid strenuous exercises.",
    "Monitor blood sugar before, after.",
    "Listen to body cues.",
    "Consult healthcare team.",
  ];

  const noDiabetesSuggestions = [
    "Balanced, varied meals.",
    "Portion control.",
    "Plenty of fruits, veggies.",
    "Limit added sugars, processed foods.",
    "Stay hydrated.",
    "150 mins weekly aerobic activity.",
    "Strength training 2x/week.",
    "Flexibility exercises.",
    "Listen to body, rest.",
    "Stay active daily.",
  ];

  let selectedSuggestions = [];

  // Determine the suggestions based on the typePrediction
  switch (typePrediction) {
    case "TYPE 1":
      selectedSuggestions = type1Suggestions;
      break;
    case "TYPE 2":
      selectedSuggestions = type2Suggestions;
      break;
    case "Gestational Diabetes":
      selectedSuggestions = gestationalSuggestions;
      break;
    case "NO DIABETES":
      selectedSuggestions = noDiabetesSuggestions;
      break;
    default:
      selectedSuggestions = [];
  }

  // Function to handle submission and navigate to another screen
  const handleSubmit = () => {
    navigation.navigate("Prediction", {
      username,
      email,
      contactNumber,
      bloodType,
    });
  };

  return (
    <View style={styles.backgroundContainerSign}>
      <Image
        source={require("C:/Users/raagd/OneDrive/Desktop/SugarD/Front-End/assets/BG2.jpg")}
        style={styles.backgroundImageSign}
      />
      <ScrollView style={styles.containerSign}>
        <View style={styles.headingContainerDiet}>
          <View style={styles.rectangle}>
            <Text style={styles.dietExercisePlan}>DIET & EXERCISE PLAN</Text>
          </View>
          <View style={styles.rectangleType}>
            <Text style={styles.typeNme}>{typePrediction}</Text>
          </View>
          {selectedSuggestions.map((text, index) => (
            <View key={index} style={styles.rectangleSuggestion}>
              <Text style={styles.dietExercisePlan}>{text}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainerExit}>
          <TouchableOpacity style={styles.ButtonExit} onPress={handleSubmit}>
            <Text style={styles.buttonTextSign2}>EXIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
