import api from "@/api/axios";
import { MaterialIcons } from "@expo/vector-icons";
import type { AxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FilePickerProps {
  setUploadedImageUrl: Dispatch<SetStateAction<string>>;
}

export const FilePicker = ({ setUploadedImageUrl }: FilePickerProps) => {
  const [image, setImage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadSchoolCredentials = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      const fileUri = result.assets[0].uri;
      setImage(fileUri);
    }
  };

  const uploadImage = useCallback(async () => {
    if (!image) return;

    try {
      setUploading(true);
      const formData = new FormData();
      // @ts-ignore
      formData.append("image", {
        uri: image,
        name: `upload_${Date.now()}.jpg`,
        type: "image/jpeg"
      });

      const response = await api.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setResult(response.data.path);
      setUploadedImageUrl(response.data.path);
    } catch (err) {
      const error = err as AxiosError;

      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  }, [image, setUploadedImageUrl]);

  useEffect(() => {
    uploadImage();
  }, [uploadImage]);

  return (
    <TouchableOpacity style={styles.upload} onPress={uploadSchoolCredentials}>
      {uploading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={"small"} color="black" />
          <Text style={styles.loadingText}>Uploading Image...</Text>
        </View>
      ) : image && !result ? (
        <Text>Failed to upload image try again</Text>
      ) : image && result ? (
        <Image source={{ uri: image }} style={styles.uploadedImage} />
      ) : (
        <MaterialIcons name="add-photo-alternate" size={24} color="black" />
      )}

      {/*{image ? (*/}
      {/*  <Image source={{ uri: image }} style={styles.uploadedImage} />*/}
      {/*) : (*/}
      {/*  <MaterialIcons name="add-photo-alternate" size={24} color="black" />*/}
      {/*)}*/}
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
  uploadedImage: {
    width: "60%",
    height: "100%",
    borderRadius: 5,
    resizeMode: "contain"
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
