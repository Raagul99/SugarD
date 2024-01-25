import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { styles } from "./styles";
import { Picker } from "@react-native-picker/picker";

export default function PredictionScreen({ route, navigation }) {
  // Destructure route.params to get user information
  const { username, email, contactNumber, bloodType } = route.params;

  // State for input values, placeholders, and errors
  const [inputs, setInputs] = useState({
    Age: "",
    Gender: "",
    Hypertension: "",
    HeartDisease: "",
    SmokingHistory: "",
    BMI: "",
    HbA1cLevel: "",
    Glucose: "",
  });

  const [placeholders, setPlaceholders] = useState({
    Age: "Age",
    Gender: "Gender",
    Hypertension: "Hypertension",
    HeartDisease: "Heart Disease",
    SmokingHistory: "Smoking History",
    BMI: "BMI",
    HbA1cLevel: "HbA1c Level",
    Glucose: "Glucose",
  });

  const [errors, setErrors] = useState({
    Age: "",
    Gender: "",
    Hypertension: "",
    HeartDisease: "",
    SmokingHistory: "",
    BMI: "",
    HbA1cLevel: "",
    Glucose: "",
  });

  // Function to toggle the visibility of the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to handle input changes and update state
  const handleInputChange = (field, text) => {
    if (field === "Gender") {
      setInputs({ ...inputs, Gender: text });
    } else if (field === "Hypertension") {
      setInputs({ ...inputs, Hypertension: text });
    } else if (field === "HeartDisease") {
      setInputs({ ...inputs, HeartDisease: text });
    } else if (field === "SmokingHistory") {
      setInputs({ ...inputs, SmokingHistory: text });
    } else {
      setInputs({ ...inputs, [field]: text });
    }

    if (text === "") {
      setPlaceholders({ ...placeholders, [field]: field });
    } else {
      setPlaceholders({ ...placeholders, [field]: "" });
    }
  };

  // Function to validate input values and display errors
  const validateInputs = () => {
    const newErrors = {};

    if (!inputs.Age) {
      newErrors.Age = "Age is required";
    } else if (isNaN(inputs.Age) || inputs.Age <= 0) {
      newErrors.Age = "Age must be a valid number greater than 0";
    }

    if (!inputs.Gender) {
      newErrors.Gender = "Gender is required";
    }

    if (!inputs.Hypertension) {
      newErrors.Hypertension = "Hypertension is required";
    }

    if (!inputs.HeartDisease) {
      newErrors.HeartDisease = "Heart Disease is required";
    }

    if (!inputs.SmokingHistory) {
      newErrors.SmokingHistory = "Smoking History is required";
    }

    if (!inputs.BMI) {
      newErrors.BMI = "BMI is required";
    } else if (isNaN(inputs.BMI) || inputs.BMI <= 0) {
      newErrors.BMI = "BMI must be a valid number greater than 0";
    }

    if (!inputs.HbA1cLevel) {
      newErrors.HbA1cLevel = "HbA1c Level is required";
    } else if (isNaN(inputs.HbA1cLevel) || inputs.HbA1cLevel <= 0) {
      newErrors.HbA1cLevel =
        "HbA1c Level must be a valid number greater than 0";
    }

    if (!inputs.Glucose) {
      newErrors.Glucose = "Glucose is required";
    } else if (isNaN(inputs.Glucose) || inputs.Glucose <= 0) {
      newErrors.Glucose = "Glucose must be a valid number greater than 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Function to send a prediction request to the server
  const predict = async () => {
    if (validateInputs()) {
      try {
        // Send a request to predict possibility
        const possibilityResponse = await fetch(
          "http://172.27.10.36:5000/predictPossibility",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
          }
        );

        const possibilityData = await possibilityResponse.json();

        // Send a request to predict type
        const typeResponse = await fetch(
          "http://172.27.10.36:5000/predictType",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
          }
        );

        const typeData = await typeResponse.json();

        // Update state with prediction results
        setPrediction(
          possibilityData.prediction === 1 ? "POSITIVE" : "NEGATIVE"
        );
        setTypePrediction(
          typeData.type_prediction === 0
            ? "No Diabetes"
            : typeData.type_prediction === 1
            ? "TYPE 1"
            : typeData.type_prediction === 2
            ? "TYPE 2"
            : typeData.type_prediction === 3
            ? "Gestational Diabetes"
            : "Unknown"
        );
        setError(null);
        toggleModal();
      } catch (error) {
        console.error("Fetch error:", error);
        setError("An error occurred. Please try again.");
      }
    }
  };

  // State for prediction, modal visibility, and error
  const [prediction, setPrediction] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [typePrediction, setTypePrediction] = useState("");

  // Function to handle the "Next" button press
  const handleNextButtonPress = () => {
    setModalVisible(false);

    navigation.navigate("Suggestion", {
      username,
      email,
      contactNumber,
      bloodType,
      typePrediction,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.containerPredict}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.circleButtonContainerPredict}>
        <TouchableOpacity
          style={styles.circleButtonPredict}
          onPress={() =>
            navigation.navigate("User", {
              username,
              email,
              contactNumber,
              bloodType,
            })
          }
        >
          <Image
            source={require("C:/Users/raagd/OneDrive/Desktop/SugarD/Front-End/assets/user.png")}
            style={styles.circleButtonImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainerType}>
        <Text style={styles.headingPredict}>DIABETES PREDICTION</Text>
      </View>
      <View style={styles.subheadingContainerType}>
        <Text style={styles.subHeadingPredict}>
          ENTER THE VALUES TO PREDICT THE POSSIBILITY & TYPE
        </Text>
      </View>
      <View style={styles.inputContainerPredict}>
        {Object.keys(inputs).map((field) => (
          <View key={field} style={styles.inputWrapperPredict}>
            {field === "Gender" ? (
              <View style={styles.genderPickerContainer}>
                <Picker
                  selectedValue={inputs.Gender}
                  onValueChange={(itemValue) =>
                    handleInputChange("Gender", itemValue.toString())
                  }
                  style={styles.genderPicker}
                  dropdownIconColor="white"
                  mode="dropdown"
                  dropdownStyle={styles.genderPickerContainer}
                >
                  <Picker.Item label="Gender" value="" />
                  <Picker.Item label="Male" value="1" />
                  <Picker.Item label="Female" value="0" />
                </Picker>
              </View>
            ) : field === "Hypertension" ? (
              <View style={styles.genderPickerContainer}>
                <Picker
                  selectedValue={inputs[field]}
                  onValueChange={(itemValue) =>
                    handleInputChange(field, itemValue.toString())
                  }
                  style={styles.genderPicker}
                  dropdownIconColor="white"
                  mode="dropdown"
                  dropdownStyle={styles.genderPickerContainer}
                >
                  <Picker.Item
                    label={placeholders[field] || "Hypertension"}
                    value=""
                  />
                  <Picker.Item label="Yes" value="1" />
                  <Picker.Item label="No" value="0" />
                </Picker>
              </View>
            ) : field === "HeartDisease" ? (
              <View style={styles.genderPickerContainer}>
                <Picker
                  selectedValue={inputs[field]}
                  onValueChange={(itemValue) =>
                    handleInputChange(field, itemValue.toString())
                  }
                  style={styles.genderPicker}
                  dropdownIconColor="white"
                  mode="dropdown"
                  dropdownStyle={styles.genderPickerContainer}
                >
                  <Picker.Item
                    label={placeholders[field] || "Heart Disease"}
                    value=""
                  />
                  <Picker.Item label="Yes" value="1" />
                  <Picker.Item label="No" value="0" />
                </Picker>
              </View>
            ) : field === "SmokingHistory" ? (
              <View style={styles.genderPickerContainer}>
                <Picker
                  selectedValue={inputs[field]}
                  onValueChange={(itemValue) =>
                    handleInputChange(field, itemValue.toString())
                  }
                  style={styles.genderPicker}
                  dropdownIconColor="white"
                  mode="dropdown"
                  dropdownStyle={styles.genderPickerContainer}
                >
                  <Picker.Item label="Smoking History" value="" />
                  <Picker.Item label="Never" value="0" />
                  <Picker.Item label="Daily" value="1" />
                  <Picker.Item label="Very Often" value="2" />
                  <Picker.Item label="Former" value="3" />
                </Picker>
              </View>
            ) : (
              <TextInput
                value={inputs[field]}
                onChangeText={(text) => handleInputChange(field, text)}
                keyboardType="numeric"
                style={[
                  styles.inputPredict,
                  errors[field] && { borderColor: "red", borderWidth: 1 },
                ]}
                placeholder={placeholders[field]}
                placeholderTextColor="#7F8489"
              />
            )}
            {errors[field] && (
              <Text style={[styles.errorText, { color: "red" }]}>
                {errors[field]}
              </Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.buttonContainerPredict}>
        <TouchableOpacity style={styles.predictButton} onPress={predict}>
          <Text style={styles.buttonTextPredict}>Submit</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Text style={[styles.errorPredict, { marginTop: 10, color: "red" }]}>
          {error}
        </Text>
      )}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainerPredict}>
          <View style={styles.rectanglePredict}></View>
          <Text style={styles.modalPossibility}>{prediction}</Text>
          <Text style={styles.modalType}>{typePrediction}</Text>
          <View style={styles.modalButtonContainerNextPredict}>
            <TouchableOpacity onPress={handleNextButtonPress}>
              <Text style={styles.modalButtonNextPredict}>Diet Plan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalButtonContainerCancelPredict}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.modalButtonNextPredict}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
