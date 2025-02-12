import React from 'react';
import { Text, View } from "react-native";
import { TouchableOpacity, StyleSheet, TextInput } from 'react-native';


const forgotPassword = () => {
  return (
    <View style={styles.container}>
      <View style={styles.outerBox} />
      <View style={styles.containerBox}>
        <Text style={styles.description}>To reset your password, submit your email address below. 
          If we can find you in the database, an email will be sent to your email address,
          with instructions how to get access again.</Text>

        {/* supposedly a horizontal line but it's not visible? */}
        <Text style={styles.separator}></Text> 

        <Text style={styles.title}>Enter Email Address</Text>
        <TextInput style={styles.input} 
        placeholder="Email"
        ></TextInput>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Confirm</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  outerBox: {
    position: 'absolute',
    width: '90%', 
    height: '45%', 
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'black',
    zIndex: -1, 
  },

  containerBox: {
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: 'white',
  },

  separator: {
    marginVertical: 10,
    height: 0.1 ,
    width: 200,
    backgroundColor: "black",
    alignSelf: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    alignSelf: "baseline"
  },

  description: {
    textAlign: 'left', 
    justifyContent: 'center',
    marginBottom: 10,
  },

  input: {
    width: 350,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },

  button: {
    width: 150,
    height: 40,
    borderWidth: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
    alignSelf: "flex-end"
  },

  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },

});




export default forgotPassword;

