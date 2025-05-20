import { MaterialIcons } from "@expo/vector-icons";
import type { CameraCapturedPicture } from "expo-camera";
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

export const CameraPickerPreview = ({
  photo,
  isSelfieImage,
  handleRetakePhoto,
  handleSubmitPhoto
}: {
  photo: CameraCapturedPicture;
  isSelfieImage?: boolean;
  handleRetakePhoto: () => void;
  handleSubmitPhoto: () => void;
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={newStyles.view1}>
        <Image
          style={[styles.previewContainer, isSelfieImage && { transform: [{ scaleX: -1 }] }]}
          source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
            <MaterialIcons name="close" size={30} color="white" />
          </TouchableOpacity>
          <View style={[styles.cornerDash, styles.topLeft]} />
          <View style={[styles.cornerDash, styles.topRight]} />
          <View style={[styles.cornerDash, styles.bottomLeft]} />
          <View style={[styles.cornerDash, styles.bottomRight]} />
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.button} onPress={handleSubmitPhoto}>
            <MaterialIcons name="check" size={30} color="white" />
          </TouchableOpacity>
          <View style={[styles.cornerDash, styles.topLeft]} />
          <View style={[styles.cornerDash, styles.topRight]} />
          <View style={[styles.cornerDash, styles.bottomLeft]} />
          <View style={[styles.cornerDash, styles.bottomRight]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const newStyles = StyleSheet.create({
  view1: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 20
  },
  view2: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 10
  },
  textBox: {
    backgroundColor: "gray",
    color: "white",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlign: "left"
  },
  inputWrapper: {
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    borderRadius: 5
  },
  loading: {
    elevation: 5,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  loadingText: {
    marginTop: 10,
    color: "white"
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    marginTop: 20
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "relative"
  },
  cornerDash: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "white",
    borderWidth: 0
  },
  topLeft: {
    borderTopLeftRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    top: 0,
    left: 0
  },
  topRight: {
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
    top: 0,
    right: 0
  },
  bottomLeft: {
    borderBottomLeftRadius: 10,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    bottom: 0,
    left: 0
  },
  bottomRight: {
    borderBottomRightRadius: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    bottom: 0,
    right: 0
  },
  previewContainer: {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: 5
  }
});
