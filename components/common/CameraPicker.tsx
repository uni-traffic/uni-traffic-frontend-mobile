import { CameraPickerPreview } from "@/components/common/CameraPickerPreview";
import { useUploadImage } from "@/hooks/file/useUploadImage";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  type CameraCapturedPicture,
  type CameraType,
  CameraView,
  useCameraPermissions
} from "expo-camera";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface SelfieCameraProps {
  setUploadedImageUrl: (image: string) => void;
  isSelfieCamera?: boolean;
}

export const CameraPicker = ({
  setUploadedImageUrl,
  isSelfieCamera = false
}: SelfieCameraProps) => {
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState<CameraCapturedPicture>();
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Failed to upload image. Try again.");

  const { mutate: uploadImage, isPending: uploading, isError } = useUploadImage();
  const cameraType: CameraType = isSelfieCamera ? "front" : "back";

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;

    const takenPhoto = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
      exif: false
    });
    setPhoto(takenPhoto);
  };

  const handleRetakePhoto = () => {
    setPhoto(undefined);
  };

  const handleSubmitPhoto = useCallback(async () => {
    if (!photo) return;

    setIsCameraOpen(false);
    uploadImage(photo.uri, {
      onSuccess: (data) => {
        setUploadedImageUrl(data);
      },
      onError: (error) => {
        setErrorMessage(
          error.message === "Network Error"
            ? "A network error occurred. Please check your internet connection and try again."
            : "Failed to upload image. Try again."
        );
      }
    });
  }, [uploadImage, photo, setUploadedImageUrl]);

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

  return (
    <>
      <TouchableOpacity style={styles.upload} onPress={() => setIsCameraOpen(true)}>
        {uploading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color="black" />
            <Text style={styles.loadingText}>Uploading Image...</Text>
          </View>
        ) : isError ? (
          <Text style={{ textAlign: "center", marginVertical: 8 }}>{errorMessage}</Text>
        ) : photo ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: photo.uri }}
              style={[styles.uploadedImage, isSelfieCamera && { transform: [{ scaleX: -1 }] }]}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={{ paddingVertical: 10 }}>
            <Feather name="camera" size={24} color="black" />
          </View>
        )}
      </TouchableOpacity>

      <Modal
        transparent
        visible={isCameraOpen}
        onRequestClose={() => setIsCameraOpen(false)}
        animationType="fade"
      >
        {photo ? (
          <CameraPickerPreview
            photo={photo}
            handleRetakePhoto={handleRetakePhoto}
            handleSubmitPhoto={handleSubmitPhoto}
            isSelfieImage={isSelfieCamera}
          />
        ) : (
          <CameraView style={styles.camera} facing={cameraType} ref={cameraRef}>
            <View style={styles.cameraContainer}>
              <View style={styles.cameraHeader}>
                <TouchableOpacity onPress={() => setIsCameraOpen(false)}>
                  <AntDesign name="closecircleo" size={32} color="black" />
                </TouchableOpacity>
              </View>

              {isSelfieCamera && (
                <View style={styles.selfieFrameContainer}>
                  <View style={styles.selfieFrame} />
                </View>
              )}

              <View style={styles.cameraFooter}>
                <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto} />
              </View>
            </View>
          </CameraView>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    paddingBottom: 10
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  upload: {
    padding: 0,
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
    alignItems: "center",
    paddingVertical: 2
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: 5
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  loadingText: {
    marginTop: 10,
    color: "black"
  },
  camera: {
    flex: 1
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  cameraHeader: {
    paddingTop: 20,
    paddingHorizontal: 20
  },
  selfieFrameContainer: {
    flexDirection: "row",
    height: "45%",
    width: "100%"
  },
  selfieFrame: {
    flex: 1,
    marginHorizontal: "12.5%",
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 1)",
    borderStyle: "dashed"
  },
  cameraFooter: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10
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
