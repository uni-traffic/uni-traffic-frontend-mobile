import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";

export const VehicleForm = () => {
    const [type, setType] = useState<string>("");
    const [make, setMake] = useState<string>("");
    const [series, setSeries] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [licensePlate, setLicensePlate] = useState<string>("");
    const [crImage, setCRImage] = useState<string>("");
    const [orImage, setORImage] = useState<string>("");
    const [frontImage, setFrontImage] = useState<string>("");
    const [backImage, setBackImage] = useState<string>("");
    const [sideImage, setSideImage] = useState<string>("");

    const uploadCRImage = async () => {
         await ImagePicker.requestMediaLibraryPermissionsAsync();
         const result = await ImagePicker.launchImageLibraryAsync({
             mediaTypes: ['images'],
             allowsEditing: true,
             aspect: [1, 1],
             quality: 1,
         });
         if (!result.canceled) {
            setCRImage(result.assets[0].uri);
        }
    };

    const uploadORImage = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setORImage(result.assets[0].uri);
       }
   };

   const uploadFImage = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setFrontImage(result.assets[0].uri);
    }
    };
    const uploadBImage = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setBackImage(result.assets[0].uri);
    }
    };
    const uploadSImage = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setSideImage(result.assets[0].uri);
    }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Vehicle Registration Form</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.section}>
                    <Text style={styles.label}>Make</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Make"
                        value={make}
                        onChangeText={setMake}/>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Series</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Series"
                        value={series}
                        onChangeText={setSeries}/>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Type</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholder="Select Type"
                        data={[
                            {id: "motorcycle", type: "Motorcycle"},
                            {id: "car", type: "Car"},
                        ]}
                        valueField="id"
                        labelField="type"
                        value={type}
                        onChange={(e) => {
                            setType(e.id);
                          }}/>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.label}>Model</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Model"
                        value={model}
                        onChangeText={setModel}/>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>License Plate</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="License Plate"
                        value={licensePlate}
                        onChangeText={setLicensePlate}/>
                </View>

                <View style={styles.section}>
                    <View style={styles.labelSection}>
                    <Text style={styles.label}>Certificate of Registration</Text>
                    <Text style={styles.subLabel}>(CR)</Text>
                    </View>
                    <TouchableOpacity style={styles.upload} onPress={uploadCRImage}>
                        {crImage ? (
                                    <Image source={{ uri: crImage }} style={styles.uploadedImage} />
                                ) : (
                                    <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                                )}
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.labelSection}>
                    <Text style={styles.label}>Official Receipt</Text>
                    <Text style={styles.subLabel}>(OR)</Text>
                    </View>
                    <TouchableOpacity style={styles.upload} onPress={uploadORImage}> 
                        {orImage ? (
                                    <Image source={{ uri: orImage }} style={styles.uploadedImage} />
                                ) : (
                                    <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                                )}
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.labelSection}>
                    <Text style={styles.label}>Front</Text>
                    <Text style={styles.subLabel}>(Front Image of the Vehicle)</Text>
                    </View>
                    <TouchableOpacity style={styles.upload} onPress={uploadFImage}> 
                        {frontImage ? (
                                    <Image source={{ uri: frontImage}} style={styles.uploadedImage} />
                                ) : (
                                    <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                                )}
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.labelSection}>
                    <Text style={styles.label}>Back</Text>
                    <Text style={styles.subLabel}>(BackImage of the Vehicle)</Text>
                    </View>
                    <TouchableOpacity style={styles.upload} onPress={uploadBImage}>
                        {backImage ? (
                                    <Image source={{ uri: backImage}} style={styles.uploadedImage} />
                                ) : (
                                    <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                                )}
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.labelSection}>
                    <Text style={styles.label}>Side</Text>
                    <Text style={styles.subLabel}>(Side Image of the Vehicle)</Text>
                    </View>
                    <TouchableOpacity style={styles.upload} onPress={uploadSImage}> 
                        {sideImage ? (
                                    <Image source={{ uri: sideImage}} style={styles.uploadedImage} />
                                ) : (
                                    <MaterialIcons name="add-photo-alternate" size={24} color="black" />
                                )}
                    </TouchableOpacity>
                </View>

            </View>
        </View>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        minHeight: 300,
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 25,
        
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    body: {
        justifyContent: "center",
        alignItems: "center",
    },
    section: {
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginBottom: 3
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "white",
        paddingLeft: 10,
    },
    title: {
        fontSize: 20,
    },
    labelSection: {
        flexDirection: "row",
        width: "100%",
        alignContent: "flex-start",
    },
    subLabel: {
        fontSize: 12,
        color: "gray",
    },
    upload: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "dashed",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        maxHeight: 200,
    },
    uploadedImage: {
        width: '60%',
        height: '100%',
        borderRadius: 5,
        resizeMode: 'contain',
    },
    dropdown: {
        height: 40,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 8,
        borderWidth: 1
      },
});