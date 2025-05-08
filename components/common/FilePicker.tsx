import { useUploadImage } from "@/hooks/file/useUploadImage";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FilePickerProps {
  setUploadedImageUrl: (image: string) => void;
}

export const FilePicker = ({ setUploadedImageUrl }: FilePickerProps) => {
  const [image, setImage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("Failed to upload image. Try again.");
  const { mutate: uploadImage, isPending: uploading, isError } = useUploadImage();

  const doUpload = useCallback(
    async (img: string) => {
      if (!img) return;

      uploadImage(img, {
        onSuccess: (data) => {
          setUploadedImageUrl(data);
        },
        onError: (error) => {
          const message = error.message;
          setErrorMessage(
            message === "Network Error"
              ? "A network error occurred. Please check your internet connection and try again."
              : "Failed to upload image. Try again."
          );
        }
      });
    },
    [uploadImage, setUploadedImageUrl]
  );

  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1
      });

      if (!result.canceled) {
        const fileUri = result.assets[0].uri;
        setImage(fileUri);
        await doUpload(fileUri); // Directly upload
      }
    } catch (err) {
      alert(`Failed to pick image: ${(err as Error).message}`);
      console.error("Failed to pick image:", err);
    }
  };

  return (
    <TouchableOpacity style={styles.upload} onPress={handlePickImage}>
      {uploading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="black" />
          <Text style={styles.loadingText}>Uploading Image...</Text>
        </View>
      ) : isError ? (
        <Text style={{ textAlign: "center" }}>{errorMessage}</Text>
      ) : image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.uploadedImage} resizeMode="contain" />
        </View>
      ) : (
        <MaterialIcons name="add-photo-alternate" size={24} color="black" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  upload: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 200
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: 5
  },
  loading: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  loadingText: {
    marginTop: 10,
    color: "black"
  }
});
