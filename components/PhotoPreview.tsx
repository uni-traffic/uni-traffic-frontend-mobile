import { MaterialIcons } from "@expo/vector-icons";
import { CameraCapturedPicture } from "expo-camera";
import { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, SafeAreaView, Text, TextInput } from "react-native";

const PhotoPreview = ({
    photo,
    handleRetakePhoto,

}: {
    photo: CameraCapturedPicture;
    handleRetakePhoto: () => void;
}) => {
    const [licensePlate, setLicensePlate] = useState("");

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <Image
                style={styles.previewContainer}
                source={{uri: 'data:image/jpg;base64,' + photo.base64}}
            />
        </View>
         <TextInput
                style={styles.textBox}
                placeholder="Enter license plate..."
                placeholderTextColor="#ccc"
                value={licensePlate}
                onChangeText={setLicensePlate}
            />
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
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 0,
    },
    box: {
        borderRadius: 15,
        width: 400,
        height: '75%',
        justifyContent: 'center',
        alignItems: "center",
    },
    image: {
        width: 'auto',
        height: 'auto',
        resizeMode: 'contain',
    },
    textBox: {
        position: "absolute",
        bottom: 170, 
        width: "60%",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        color: "white",
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        textAlign: "center",
    },
    label: { 
        color: "white", 
        fontSize: 16,
     },
    buttonContainer: {
        flexDirection: "row",
        width: "60%",
        justifyContent: "space-between",
        marginTop: 50,
      },
      button: {
        width: 68,
        height: 68,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        position: "relative", 
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
    previewContainer: {
        width: '95%',
        height: '85%',
        borderRadius: 15
    },
});

export default PhotoPreview;
