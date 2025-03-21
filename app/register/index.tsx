import { DriverForm } from "@/components/user/driver-info-form";
import { UserForm } from "@/components/user/user-info-form";
import { VehicleForm } from "@/components/user/vehicle-info-form";
import { router } from "expo-router";
import { Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

export default function Register() {
    const handleSubmit = () => {
        alert("Form Submitted");
        router.push("/(user)");
    }
    const handleCancel = () => {
        router.push("/(user)");
    }
    return (
        <View style={styles.mainContainer}>
            <ScrollView>
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <Image style={styles.logo} source={require("../../assets/images/neu-logo.png")} /> 
                    <View style={styles.textContainer}>
                        <Text style={styles.headerText}>UNITRAFFIC</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.sectionContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Vehicle Registration</Text>
                </View>
                
                <View style={styles.body}>
                    <View style={styles.section}>
                        <UserForm />
                    </View>
                    <View style={styles.section}>
                        <DriverForm />
                    </View>
                    <View style={styles.section}>
                        <VehicleForm />
                    </View>
                <View style={styles.btnContainer}>

                    <TouchableOpacity style={styles.button} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#eee",
        width: "100%",
        minHeight: 300,
    },
    headerContainer: {
        backgroundColor: "black",
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    textContainer: {
        justifyContent: "center",
    },
    logo: {
        height: 60,
        width: 60,
        marginRight: 20,
        alignSelf: "center"
    },
    title: {
        fontSize: 25,
        alignSelf: "flex-start",
        padding: 10,
    },
    headerText: {
        color: "white",
        fontSize: 40,
        alignSelf: "flex-start"
    },
    titleContainer: {
        flexDirection: "row",
        alignSelf: "center",
      },
    body: {
        padding: 5,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minHeight: 300,
    },
    sectionContainer: {
        justifyContent: "space-between"
    },
    section: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16
      },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#20201F",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        alignSelf: "flex-end",
        marginTop: 10
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: "100%",
        marginTop: 20,
        columnGap: 10,
    },
});