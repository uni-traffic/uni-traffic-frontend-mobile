import PhotoPreview from "@/components/security/photoPreview";
import { useAuth } from "@/context/authContext";
import {
  type CameraCapturedPicture,
  type CameraType,
  CameraView,
  useCameraPermissions
} from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Camera() {
  const router = useRouter();

  const { user } = useAuth();
  if (!user || user.role !== "SECURITY") {
    router.replace("/auth/login");
  }

  const [facing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | undefined>();
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
        exif: false
      };
      const takenPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(takenPhoto);
    }
  };

  const handleRetakePhoto = () => setPhoto(undefined);

  if (photo) return <PhotoPreview photo={photo} handleRetakePhoto={handleRetakePhoto} />;

  return (
    <View style={newStyle.container}>
      <View style={newStyle.header}>
        <Text style={newStyle.title}>License Plate Scanner</Text>
      </View>

      <CameraView style={newStyle.camera} facing={facing} ref={cameraRef}>
        <View style={newStyle.cameraContainer}>
          <View style={newStyle.div1} />
          <View style={newStyle.div2}>
            <View style={newStyle.left} />
            <View style={newStyle.license}>
              <View style={[styles.cornerDash, styles.topLeft]} />
              <View style={[styles.cornerDash, styles.topRight]} />
              <View style={[styles.cornerDash, styles.bottomLeft]} />
              <View style={[styles.cornerDash, styles.bottomRight]} />
            </View>
            <View style={newStyle.right} />
          </View>
          <View style={newStyle.div3}>
            <TouchableOpacity style={newStyle.cameraButton} onPress={handleTakePhoto} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const newStyle = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: "100%",
    height: "4%",
    backgroundColor: "#20201F",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 15,
    color: "white"
  },
  camera: {
    flex: 1
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    width: "100%"
  },
  div1: {
    height: "35%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  div2: {
    flexDirection: "row",
    height: "15%",
    width: "100%"
  },
  left: {
    width: "17.5%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  license: {
    width: "65%",
    height: "100%"
  },
  right: {
    width: "17.5%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  div3: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  cameraButton: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderColor: "#20201F",
    borderWidth: 3,
    borderRadius: 360,
    marginBottom: 60
  }
});

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.5
  },
  message: {
    textAlign: "center",
    paddingBottom: 10
  },
  label: {
    fontSize: 15,
    color: "white",
    textAlign: "center"
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  buttonContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -138 }, { translateY: -30 }],
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.5
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  cornerDash: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "white",
    borderWidth: 0
  },
  topLeft: {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    top: 0,
    left: 0
  },
  topRight: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    top: 0,
    right: 0
  },
  bottomLeft: {
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    bottom: 0,
    left: 0
  },
  bottomRight: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    bottom: 0,
    right: 0
  }
});
