import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useAuth();
  const handleLogin = async () => {
    await login(username, password);
  };

  return (
    <View style={newStyles.main}>
      <View style={newStyles.logoContainer}>
        <Image style={newStyles.logo} source={require("../../assets/images/neu-logo.png")} />
      </View>
      <View style={newStyles.secondContainer}>
        <View style={newStyles.cardContainer}>
          <View style={newStyles.cardTitleContainer}>
            <Text style={newStyles.cardTitleText}>Log in to</Text>
            <Image
              style={newStyles.uniTrafficLogo}
              source={require("../../assets/images/uni-traffic-text.png")}
            />
          </View>
          <View style={newStyles.formGoogleButtonContainer}>
            <TouchableOpacity style={newStyles.signInWithGoogleButton}>
              <Image
                style={newStyles.googleLogo}
                source={require("../../assets/images/google-icon.png")}
              />
              <View style={newStyles.googleTextContainer}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>Sign in with Google</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={newStyles.separatorContainer}>
            <View style={newStyles.separator} />
            <Text style={newStyles.separatorText}>or enter your credentials</Text>
          </View>
          {error ? (
            <View style={newStyles.errorContainer}>
              <Text style={newStyles.errorMessage}>Something went wrong</Text>
            </View>
          ) : null}
          <View style={newStyles.formSection}>
            <TextInput
              style={newStyles.formTextInput}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={newStyles.formSection}>
            <TextInput
              style={newStyles.formTextInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={newStyles.formSection}>
            <TouchableOpacity style={newStyles.formSubmitButton} onPress={handleLogin}>
              <Text style={newStyles.formButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const newStyles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#EBEAF0"
  },
  logoContainer: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    position: "relative",
    top: 20,
    elevation: 5,
    height: 100,
    width: 100
  },
  secondContainer: {
    alignItems: "center"
  },
  cardContainer: {
    width: "85%",
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 10,
    position: "relative",
    top: "15%",
    backgroundColor: "white",
    paddingVertical: 15
  },
  cardTitleContainer: {
    alignItems: "center",
    height: 65
  },
  cardTitleText: {
    color: "black",
    fontSize: 18,
    fontWeight: "900"
  },
  uniTrafficLogo: {
    height: "30%",
    width: "35%"
  },
  formGoogleButtonContainer: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center"
  },
  signInWithGoogleButton: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    width: "75%",
    justifyContent: "center"
  },
  googleLogo: {
    height: 25,
    width: 25
  },
  googleTextContainer: {
    justifyContent: "center",
    marginLeft: 12
  },
  separatorContainer: {
    marginTop: 10,
    height: 20,
    alignItems: "center"
  },
  separator: {
    borderTopWidth: 1,
    borderColor: "lightgray",
    width: "75%"
  },
  separatorText: {
    fontSize: 12,
    marginTop: 3,
    fontWeight: "300"
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  errorMessage: {
    paddingVertical: 2,
    width: "75%",
    textAlign: "center",
    textAlignVertical: "center",
    textDecorationLine: "underline",
    fontSize: 14,
    borderRadius: 5,
    color: "rgb(128, 40, 40)",
    backgroundColor: "rgba(253, 140, 140, 0.9)"
  },
  formContainer: {
    flex: 1,
    alignItems: "center"
  },
  formSection: {
    width: "100%",
    alignItems: "center",
    marginTop: 10
  },
  formTextInput: {
    width: "75%",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    padding: 10
  },
  formSubmitButton: {
    width: "75%",
    borderWidth: 1,
    height: 37,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  formButtonText: {
    color: "white",
    fontWeight: "bold"
  }
});
