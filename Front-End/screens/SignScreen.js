import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { styles } from "./styles";

export default function SignScreen({ navigation }) {
  // State for controlling sign-in and register modals
  const [isSignInPopupVisible, setSignInPopupVisible] = useState(false);
  const [isRegisterPopupVisible, setRegisterPopupVisible] = useState(false);

  // State for user input values and error messages
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [bloodTypeError, setBloodTypeError] = useState("");

  // Function to show the sign-in modal
  const showSignInPopup = () => {
    setSignInPopupVisible(true);
  };

  // Function to show the register modal
  const showRegisterPopup = () => {
    setRegisterPopupVisible(true);
  };

  // Function to handle user registration
  const handleRegister = async () => {
    // Clear any existing error messages
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPasswordMismatchError("");
    setContactNumberError("");
    setBloodTypeError("");

    let isValid = true;

    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setPasswordMismatchError("Passwords do not match");
      isValid = false;
    }

    if (!contactNumber) {
      setContactNumberError("Contact number is required");
      isValid = false;
    } else if (!/^\d{10}$/.test(contactNumber)) {
      setContactNumberError("Contact number must be a 10-digit number");
      isValid = false;
    }

    if (!bloodType) {
      setBloodTypeError("Blood type is required");
      isValid = false;
    }

    if (isValid) {
      const data = {
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPassword,
        contactNumber: contactNumber,
        bloodType: bloodType,
      };

      try {
        const response = await fetch("http://172.27.10.36:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result);

        if (result.message === "Registration successful.") {
          setRegisterPopupVisible(false);

          const { username, email, contactNumber, bloodType } = result.user;

          navigation.navigate("User", {
            username,
            email,
            contactNumber,
            bloodType,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function to handle user login
  const handleLogin = () => {
    // Clear any existing error messages
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required");
    }

    if (!password) {
      setPasswordError("Password is required");
    }

    if (!username || !password) {
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    try {
      fetch("http://172.27.10.36:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);

          if (result.message === "Login successful.") {
            setSignInPopupVisible(false);

            const { username, email, contactNumber, bloodType } = result.user;

            navigation.navigate("User", {
              username,
              email,
              contactNumber,
              bloodType,
            });
          } else {
            setPasswordError("Invalid username or password");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.backgroundContainerSign}>
      <Image
        source={require("C:/Users/raagd/OneDrive/Desktop/SugarD/Front-End/assets/BG1.jpg")}
        style={styles.backgroundImageSign}
      />
      <ScrollView style={styles.containerSign}>
        <View style={styles.headingContainerSign}>
          <Text style={styles.headingSign}>Sugar D</Text>
        </View>
        <View style={styles.subheadingContainerSign}>
          <Text style={styles.subHeadingSign}>LET’S BE HEALTHY</Text>
        </View>
        <View style={styles.buttonContainerSign1}>
          <TouchableOpacity
            style={styles.ButtonSign1}
            onPress={showSignInPopup}
          >
            <Text style={styles.buttonTextSign1}>SIGN IN</Text>
          </TouchableOpacity>
          <View style={styles.divideContainerSign}>
            <Text style={styles.divideSign}>OR</Text>
          </View>
        </View>
        <View style={styles.buttonContainerSign2}>
          <TouchableOpacity
            style={styles.ButtonSign2}
            onPress={showRegisterPopup}
          >
            <Text style={styles.buttonTextSign2}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={isSignInPopupVisible}
        animationType="slide"
        transparent={true}
      >
        {/* Sign-in modal */}
        <View style={styles.popupContainerSign}>
          <TouchableOpacity
            style={styles.rectangleSign}
            onPress={() => setSignInPopupVisible(false)}
          ></TouchableOpacity>
          <View style={styles.subheadingContainerSign1}>
            <Text style={styles.subHeadingSign1}>SIGN IN</Text>
          </View>
          <TextInput
            style={styles.inputSign}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholderTextColor="#7F8489"
          />
          {usernameError !== "" && (
            <Text style={{ color: "red" }}>{usernameError}</Text>
          )}
          <TextInput
            style={styles.inputSign}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholderTextColor="#7F8489"
          />
          {passwordError !== "" && (
            <Text style={{ color: "red" }}>{passwordError}</Text>
          )}
          <TouchableOpacity
            style={styles.popupButtonSign}
            onPress={handleLogin}
          >
            <Text style={styles.popupButtonTextSign}>SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        visible={isRegisterPopupVisible}
        animationType="slide"
        transparent={true}
      >
        {/* Register modal */}
        <View style={styles.popupContainerSign1}>
          <TouchableOpacity
            style={styles.rectangleSign}
            onPress={() => setRegisterPopupVisible(false)}
          ></TouchableOpacity>
          <View style={styles.subheadingContainerSign1}>
            <Text style={styles.subHeadingSign1}>REGISTER</Text>
          </View>
          <TextInput
            style={styles.inputSign}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            placeholderTextColor="#7F8489"
          />
          {usernameError !== "" && (
            <Text style={{ color: "red" }}>{usernameError}</Text>
          )}
          <TextInput
            style={styles.inputSign}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#7F8489"
          />
          {emailError !== "" && (
            <Text style={{ color: "red" }}>{emailError}</Text>
          )}
          <TextInput
            style={styles.inputSign}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#7F8489"
          />
          {passwordError !== "" && (
            <Text style={{ color: "red" }}>{passwordError}</Text>
          )}
          <TextInput
            style={styles.inputSign}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholderTextColor="#7F8489"
          />
          {confirmPasswordError !== "" && (
            <Text style={{ color: "red" }}>{confirmPasswordError}</Text>
          )}
          <TextInput
            style={styles.inputSign}
            placeholder="Contact Number"
            onChangeText={(text) => setContactNumber(text)}
            keyboardType="numeric"
            placeholderTextColor="#7F8489"
          />
          {contactNumberError !== "" && (
            <Text style={{ color: "red" }}>{contactNumberError}</Text>
          )}
          <TextInput
            style={styles.inputSign}
            placeholder="Blood Type"
            onChangeText={(text) => setBloodType(text)}
            placeholderTextColor="#7F8489"
          />
          {bloodTypeError !== "" && (
            <Text style={{ color: "red" }}>{bloodTypeError}</Text>
          )}
          <TouchableOpacity
            style={styles.popupButtonSign}
            onPress={handleRegister}
          >
            <Text style={styles.popupButtonTextSign}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
