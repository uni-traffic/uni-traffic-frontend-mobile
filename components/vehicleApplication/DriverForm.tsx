import type { DriverDetailsForm } from "@/app/register";
import { FilePicker } from "@/components/common/FilePicker";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export interface DriverFormProps {
  setDriverDetails: (details: DriverDetailsForm) => void;
}

export const DriverForm = ({ setDriverDetails }: DriverFormProps) => {
  const [formState, setFormState] = useState<DriverDetailsForm>({
    firstName: "",
    lastName: "",
    licenseId: "",
    licenseImage: ""
  });

  useEffect(() => {
    setDriverDetails(formState);
  }, [formState, setDriverDetails]);

  const handleChange = (field: keyof DriverDetailsForm, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

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
            value={formState.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formState.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>License ID</Text>
          <TextInput
            style={styles.input}
            placeholder="License ID"
            value={formState.licenseId}
            onChangeText={(text) => handleChange("licenseId", text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>License Image</Text>
          <FilePicker setUploadedImageUrl={(url) => handleChange("licenseImage", url)} />
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
