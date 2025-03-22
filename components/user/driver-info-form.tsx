import type { DriverDetailsForm } from "@/app/register";
import { FilePicker } from "@/components/common/file-picker";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export interface DriverFormProps {
  setDriverDetails: Dispatch<SetStateAction<DriverDetailsForm>>;
}

export const DriverForm = ({ setDriverDetails }: DriverFormProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [licenseID, setLicenseID] = useState<string>("");
  const [licenseImage, setLicenseImage] = useState<string>("");

  useEffect(() => {
    setDriverDetails({
      firstName: firstName,
      lastName: lastName,
      licenseId: licenseID,
      licenseImage: licenseImage
    });
  }, [licenseID, licenseImage, firstName, lastName, setDriverDetails]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Driver Details</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>License ID</Text>
          <TextInput
            style={styles.input}
            placeholder="License ID"
            value={licenseID}
            onChangeText={setLicenseID}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>License Image</Text>
          <FilePicker setUploadedImageUrl={setLicenseImage} />
        </View>
      </View>
    </View>
  );
};

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
    paddingBottom: 25
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  body: {
    justifyContent: "center",
    alignItems: "center"
  },
  section: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
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
    paddingLeft: 10
  },
  title: {
    fontSize: 20
  },
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
  }
});
