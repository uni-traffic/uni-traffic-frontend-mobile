import { useGetSignedUrl } from "@/hooks/file/useGetSignedUrl";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { ActivityIndicator, Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";

export const NeuImage = ({ image, cover }: { image: string; cover?: boolean }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { data, isLoading } = useGetSignedUrl({
    path: image
  });

  return (
    <>
      <View style={{ width: "100%", height: "100%" }}>
        {isLoading ? (
          <View style={{ height: "100%", width: "100%", justifyContent: "center" }}>
            <ActivityIndicator size="small" color="black" />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setIsFullscreen(true)}
            style={{ height: "100%", width: "100%" }}
          >
            <Image
              source={{ uri: data }}
              style={[subStyle.uploadedImage, cover && subStyle.cover]}
            />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        transparent
        visible={isFullscreen}
        onRequestClose={() => setIsFullscreen(false)}
        animationType="fade"
      >
        <View style={{ backgroundColor: "black", height: "100%", width: "100%" }}>
          <TouchableOpacity
            onPress={() => setIsFullscreen(false)}
            style={{
              position: "absolute",
              right: 20,
              top: 20,
              zIndex: 2,
              padding: 5
            }}
          >
            <FontAwesome name="close" size={32} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: data }} style={subStyle.uploadedImage} />
        </View>
      </Modal>
    </>
  );
};

const subStyle = StyleSheet.create({
  uploadedImage: {
    height: "100%",
    resizeMode: "contain"
  },
  cover: {
    resizeMode: "cover"
  }
});
