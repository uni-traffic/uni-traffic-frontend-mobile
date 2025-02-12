import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Stack, useRouter } from 'expo-router';

export default function LandingPage() {
  const router = useRouter();
  return (
    <><Stack.Screen options={{ title: "", headerShown: false }} />
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <Image source={require('../assets/images/UnitrafficLogo.png')} style={styles.logoImage} />
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/login")}>
          <Text style={styles.textButton}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.unitrafficDescription}>UniTraffic ensures hassle-free vehicle entry at New Era University by verifying sticker registration and tracking violations with a quick scan.</Text>
      </View>
    </View></>
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
    borderColor: "white",
    padding: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#EBEAF0',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 100,
  },
  logoImage: {
    marginTop: 300,
    width: '100%',
    height: 200,
  },
  button: { 
    fontFamily: 'singleline',
    fontSize: 16,
    width: 300,
    height: 36,
    borderWidth: 1,
    backgroundColor: "#20201F",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 150, 
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  textButton: {
    color: 'white',
  },
  unitrafficDescription: {
    fontFamily: 'roboto',
    fontSize: 12,
    marginTop: 20,
  }
});