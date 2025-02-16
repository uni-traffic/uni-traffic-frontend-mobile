import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { useAuth } from "@/context/authContext";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();

  const handleLogin = async () => {
    await login(username, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <Text style={styles.title}>UNITRAFFIC</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity>*/}
        {/*  <Link href="/auth/forgot-password">*/}
        {/*    <Text style={styles.forgotPassword}>forgot password?</Text>*/}
        {/*  </Link>*/}
        {/*</TouchableOpacity>*/}
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