import type { VehicleDetailsForm } from "@/app/register";
import { FilePicker } from "@/components/common/FilePicker";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export interface VehicleFormProps {
  setVehicleDetails: Dispatch<SetStateAction<VehicleDetailsForm>>;
}

export const VehicleForm = ({ setVehicleDetails }: VehicleFormProps) => {
  const [formState, setFormState] = useState<VehicleDetailsForm>({
    type: "",
    make: "",
    series: "",
    model: "",
    licensePlate: "",
    certificateOfRegistration: "",
    officialReceipt: "",
    frontImage: "",
    backImage: "",
    sideImage: ""
  });

  useEffect(() => {
    setVehicleDetails(formState);
  }, [formState, setVehicleDetails]);

  const handleChange = (field: keyof VehicleDetailsForm, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Vehicle Registration Details</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.label}>Make</Text>
          <TextInput
            style={styles.input}
            placeholder="Make"
            value={formState.make}
            onChangeText={(text) => handleChange("make", text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Series</Text>
          <TextInput
            style={styles.input}
            placeholder="Series"
            value={formState.series}
            onChangeText={(text) => handleChange("series", text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Type</Text>
          <Dropdown
            style={styles.dropdown}
            placeholder="Select Type"
            data={[
              { id: "MOTORCYCLE", type: "MOTORCYCLE" },
              { id: "CAR", type: "CAR" }
            ]}
            valueField="id"
            labelField="type"
            value={formState.type}
            onChange={(e) => handleChange("type", e.id)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Model</Text>
          <TextInput
            style={styles.input}
            placeholder="Model"
            value={formState.model}
            onChangeText={(text) => handleChange("model", text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>License Plate</Text>
          <TextInput
            style={styles.input}
            placeholder="License Plate"
            value={formState.licensePlate}
            onChangeText={(text) => handleChange("licensePlate", text)}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.labelSection}>
            <Text style={styles.label}>Certificate of Registration</Text>
            <Text style={styles.subLabel}>(CR)</Text>
          </View>
          <FilePicker
            setUploadedImageUrl={(url) => handleChange("certificateOfRegistration", url)}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.labelSection}>
            <Text style={styles.label}>Official Receipt</Text>
            <Text style={styles.subLabel}>(Latest Official Receipt)</Text>
          </View>
          <FilePicker setUploadedImageUrl={(url) => handleChange("officialReceipt", url)} />
        </View>

        <View style={styles.section}>
          <View style={styles.labelSection}>
            <Text style={styles.label}>Front</Text>
            <Text style={styles.subLabel}>(Front Image of the Vehicle)</Text>
          </View>
          <FilePicker setUploadedImageUrl={(url) => handleChange("frontImage", url)} />
        </View>

        <View style={styles.section}>
          <View style={styles.labelSection}>
            <Text style={styles.label}>Side</Text>
            <Text style={styles.subLabel}>(Side Image of the Vehicle)</Text>
          </View>
          <FilePicker setUploadedImageUrl={(url) => handleChange("sideImage", url)} />
        </View>

        <View style={styles.section}>
          <View style={styles.labelSection}>
            <Text style={styles.label}>Back</Text>
            <Text style={styles.subLabel}>(Rear Image of the Vehicle)</Text>
          </View>
          <FilePicker setUploadedImageUrl={(url) => handleChange("backImage", url)} />
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
    marginRight: 2,
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
  labelSection: {
    flexDirection: "row",
    width: "100%"
  },
  subLabel: {
    fontSize: 14,
    color: "gray"
  },
  dropdown: {
    height: 40,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1
  }
});
