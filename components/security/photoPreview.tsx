import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import type { CameraCapturedPicture } from "expo-camera";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const PhotoPreview = ({
  photo,
  handleRetakePhoto
}: {
  photo: CameraCapturedPicture;
  handleRetakePhoto: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [licensePlate, setLicensePlate] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    const fileName = photo.uri.split("/").pop();
    const fileType = fileName?.split(".").pop();

    // @ts-ignore
    formData.append("upload", {
      uri: photo.uri,
      name: fileName,
      type: `image/${fileType}`
    });

    const token = "YOUR_TOKEN_HERE";
    try {
      const response = await axios.post(
        "https://api.platerecognizer.com/v1/plate-reader",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`
          }
        }
      );

      const responseData = response.data;
      if (responseData.results[0].plate) {
        setLicensePlate((responseData.results[0].plate as string).toUpperCase());
        return;
      }

      setLicensePlate("Failed to extract license plate from image.");
    } catch (error) {
      setLicensePlate("Failed to extract license plate from image.");
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // handleUpload();
  }, []);

  if (loading) {
    return (
      <View style={newStyles.loading}>
        <ActivityIndicator size={"large"} color="white" />
        <Text style={newStyles.loadingText}>Processing Image...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={newStyles.view1}>
        <Image
          style={styles.previewContainer}
          source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
        />
      </View>
      <View style={newStyles.view2}>
        <View style={newStyles.inputWrapper}>
          <TextInput
            style={newStyles.textBox}
            placeholder="Enter license plate..."
            placeholderTextColor="white"
            value={licensePlate}
            onChangeText={setLicensePlate}
          />
          <MaterialIcons name="edit" size={20} color="white" />
        </View>
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
          <TouchableOpacity style={styles.button}>
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
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  view2: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 20
  },
  textBox: {
    height: "100%",
    width: "60%",
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
    borderRadius: 5,
    height: 50
  },
  icon: {
    position: "absolute",
    color: "white",
    left: 10
  },
  loading: {
    backgroundColor: "black",
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
    justifyContent: "flex-start",
    paddingTop: 0
  },
  box: {
    borderRadius: 15,
    width: 400,
    height: "75%",
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    color: "white",
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    marginTop: 50
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
    width: "95%",
    height: "85%",
    borderRadius: 5
  }
});

export default PhotoPreview;
