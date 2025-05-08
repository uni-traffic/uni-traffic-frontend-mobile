import type { SchoolMemberDetailsForm } from "@/app/register";
import { FilePicker } from "@/components/common/FilePicker";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export interface SchoolMemberProps {
  setSchoolMember: (schoolMember: SchoolMemberDetailsForm) => void;
}

export const SchoolMemberInformationForm = ({ setSchoolMember }: SchoolMemberProps) => {
  const [formState, setFormState] = useState<SchoolMemberDetailsForm>({
    schoolId: "",
    firstName: "",
    lastName: "",
    userType: "",
    schoolCredential: ""
  });

  useEffect(() => {
    setSchoolMember(formState);
  }, [formState, setSchoolMember]);

  const handleChange = (field: keyof SchoolMemberDetailsForm, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Staff/Student Details</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.label}>School ID</Text>
          <TextInput
            style={styles.input}
            placeholder="ID Number"
            value={formState.schoolId}
            onChangeText={(text) => handleChange("schoolId", text)}
          />
        </View>

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
            value={formState.userType}
            onChange={(e) => {
              handleChange("userType", e.id);
            }}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.labelSection}>
            <Text style={styles.label}>School Credential</Text>
            <Text style={styles.subLabel}>(School ID or COM)</Text>
          </View>
          <FilePicker setUploadedImageUrl={(url) => handleChange("schoolCredential", url)} />
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
