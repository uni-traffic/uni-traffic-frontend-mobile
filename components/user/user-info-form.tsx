import { FilePicker } from "@/components/common/file-picker";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export const UserForm = () => {
  const [type, setType] = useState<string>("");
  const [schoolID, setSchoolID] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [image, setImage] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Staff/Student Form</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.label}>School ID</Text>
          <TextInput
            style={styles.input}
            placeholder="ID Number"
            value={schoolID}
            onChangeText={setSchoolID}
          />
        </View>

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
          <Text style={styles.label}>Type</Text>
          <Dropdown
            style={styles.dropdown}
            placeholder="Select Type"
            data={[
              { id: "STAFF", type: "STAFF" },
              { id: "STUDENT", type: "STUDENT" }
            ]}
            valueField="id"
            labelField="type"
            value={type}
            onChange={(e) => {
              setType(e.id);
            }}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.labelSection}>
            <Text style={styles.label}>School Credentials</Text>
            <Text style={styles.subLabel}>(School ID, COM, OR)</Text>
          </View>
          <FilePicker setUploadedImageUrl={setImage} />
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
  labelSection: {
    flexDirection: "row",
    width: "100%",
    alignContent: "flex-start"
  },
  subLabel: {
    fontSize: 12,
    color: "gray"
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
  dropdown: {
    height: 40,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1
  },
  uploadedImage: {
    width: "60%",
    height: "100%",
    borderRadius: 5,
    resizeMode: "contain"
  }
});
