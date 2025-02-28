import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, Image } from "react-native";
import SelectViolationScreen from "./dropdown";
import { useNavigation } from "expo-router";

const ViolationPage = () => {
  const [vehicle, setVehicle] = useState(" ");
  const [violation, setViolation] = useState(" ");
  const [details, setDetails] = useState(" ");
  const navigation = useNavigation();

  const handleSubmit = () => {
    alert("Violation Submitted");
    navigation.goBack();
  };

  const handleCancel = () => {
    setVehicle("Vehicle");
    setViolation("Select Violation");
    setDetails("Type here..");
   navigation.goBack();
  };

  return (
    <View style={styles.maincontainer}>
       <View style={styles.titleContainer}>
        <View>
        <Image style={styles.logo} source={require("../../assets/images/neu-logo.png")}/>
        <Text style={styles.title}>Report Violation</Text>
        </View>
        </View>
      <View style={styles.section}>
        <View style={styles.container}>
          <Text style={styles.label}>Vehicle</Text>
          <View style={styles.box}>
            <TextInput
              style={styles.input}
              placeholder="Vehicle"
              onChangeText={setVehicle}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Violation Type</Text>
          <View style={styles.box}>
          <SelectViolationScreen />
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Remarks</Text>
          <View style={styles.box}>
            <TextInput
              style={[styles.input, styles.multilineText]}
              placeholder="Type here.."
              multiline={true}
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType="done"
              onChangeText={setDetails}
            />
          </View>
        </View>
        <View style={styles.box}>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.btnLabel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.btnLabel}>Submit Violation</Text>
          </TouchableOpacity>
        </View> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    maincontainer: {
      flex: 1,
      backgroundColor: "#EBEAF0", 
      width: "100%",
    },
    section: {
      flex: 1,
      alignItems: "center",
      width: "100%",
      marginTop: 20,
    },
    button: {
      height: 30,
      width: "40%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#20201F",
      margin: 4,
      marginTop: 10,
      borderRadius: 8
    },
    container: {
      width: "80%", 
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: 'white',
      alignSelf: 'center',
    },
    box: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      width: "100%",
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: "white",
      padding: 10
    },
    btnLabel: {
      color: "white"
    },
    label: {
      fontSize: 16,
      alignSelf: "flex-start",
      fontWeight: "bold"
    },
    multilineText: {
      minHeight: 100,
      textAlignVertical: "top"
    },
    logo:{
      height: 60,
      width: 60,
      alignSelf: 'center',
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: 'center',
      width: '100%',
      height: 100,
      backgroundColor: "#20201F",
      padding: 5,
    },
  });

export default ViolationPage;
