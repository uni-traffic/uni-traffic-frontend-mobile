import { TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Text, View} from '@/components/Themed';
import React from 'react';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <Text style={styles.title}>UNITRAFFIC</Text>
        <TextInput style={styles.input} placeholder="Username"></TextInput>
        <TextInput style={styles.input} placeholder="Password"></TextInput>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerBox: {
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },

  input: {
    width: 250,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 5
  },

  button: {
    width: 250,
    height: 40,
    borderWidth: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10
  },

  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },

  forgotPassword: {
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "black",
  }

});
