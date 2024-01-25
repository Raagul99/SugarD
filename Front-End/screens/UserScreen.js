import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { styles } from "./styles";

export default function UserScreen({ route, navigation }) {
  // Destructure parameters from route
  const { username, email, contactNumber, bloodType } = route.params;

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
    <ScrollView style={styles.containerPredict}>
      <View style={styles.headingContainerUser}>
        <Text style={styles.headingUser}>PROFILE</Text>
      </View>
      <View style={styles.profileIcon}>
        <Image
          source={require("C:/Users/raagd/OneDrive/Desktop/SugarD/Front-End/assets/user1.png")}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <View style={styles.inputContainerPredict}>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>Username :</Text>
          <Text style={styles.inputUser}>{username}</Text>
        </View>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>Email :</Text>
          <Text style={styles.inputUser}>{email}</Text>
        </View>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>Contact Number :</Text>
          <Text style={styles.inputUser}>{contactNumber}</Text>
        </View>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>Blood Type :</Text>
          <Text style={styles.inputUser}>{bloodType}</Text>
        </View>
      </View>
      <View style={styles.buttonContainerPredict}>
        <TouchableOpacity style={styles.predictButton} onPress={handleSubmit}>
          <Text style={styles.buttonTextPredict}>PREDICTION</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
