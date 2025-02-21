import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import PhotoPreview from '@/components/PhotoPreview';
import { FontAwesome } from '@expo/vector-icons';

export default function Camera () {
  const [facing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<any>(null);
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

 if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const takenPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takenPhoto);
    }
  }

  const handleRetakePhoto = () => setPhoto(null);

  if (photo) return <PhotoPreview photo={photo} handleRetakePhoto={handleRetakePhoto} />
  
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>License Plate Scanner</Text>
        </View>
  
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
           <View style={styles.button}>
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
              <FontAwesome name="search" size={30} color="white" />
            </TouchableOpacity>
            <View style={[styles.cornerDash, styles.topLeft]} />
            <View style={[styles.cornerDash, styles.topRight]} />
            <View style={[styles.cornerDash, styles.bottomLeft]} />
            <View style={[styles.cornerDash, styles.bottomRight]} />
          </View>

          <View style={styles.button}>
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
              <FontAwesome name="barcode" size={30} color="white" />
            </TouchableOpacity>
            <View style={[styles.cornerDash, styles.topLeft]} />
            <View style={[styles.cornerDash, styles.topRight]} />
            <View style={[styles.cornerDash, styles.bottomLeft]} />
            <View style={[styles.cornerDash, styles.bottomRight]} />
          </View>
          </View>
            <View style={styles.camButtonContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
            </TouchableOpacity>
            </View>
        </CameraView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  label: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  camera: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#20201F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    color: 'white',
    paddingTop: 45,
  },
  buttonContainer: {
    position: 'absolute',
    top: '50%', 
    left: '50%', 
    transform: [{ translateX: -138 }, { translateY: -30 }], 
    flexDirection: 'row',
    width: "70%",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  camButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  cameraButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#20201F',
    borderWidth: 3,
    borderRadius: 30,
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerDash: {
    position: "absolute",
    width: 20, 
    height: 20, 
    borderColor: "white",
    borderWidth: 0,
  },
  topLeft: {
    borderTopLeftRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    top: 0,
    left: 0,
  },
  topRight: {
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
    top: 0,
    right: 0,
  },
  bottomLeft: {
    borderBottomLeftRadius: 10,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    borderBottomRightRadius: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    bottom: 0,
    right: 0,
  },
});