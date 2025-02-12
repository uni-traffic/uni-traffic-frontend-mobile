import { TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Text, View} from '@/components/Themed';
import React from 'react';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (username === 'test' && password === 'password'){
      setErrorMessage('');
      alert('Login successful');
    }
    else{
      setErrorMessage('Invalid login, please try again');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerBox}>

        <Text style={styles.title}>UNITRAFFIC</Text>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TextInput style={styles.input} 
        placeholder="Username"
        value={username}
        onChangeText={setUsername} 
        ></TextInput>
        
        <TextInput style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword} 
        ></TextInput>

        <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Link href="/forgot-password">
            <Text style={styles.forgotPassword}>forgot password?</Text>
          </Link>
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
    margin: 5,
    padding: 10
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
  },

  errorText: {
    color: "rgb(128, 40, 40)",
    fontSize: 14,
    margin: 5,
    backgroundColor: "rgba(253, 140, 140, 0.9)",
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
  }

});
