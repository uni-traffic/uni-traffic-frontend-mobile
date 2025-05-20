import { DriverForm } from "@/components/vehicleApplication/DriverForm";
import { SchoolMemberInformationForm } from "@/components/vehicleApplication/SchoolMemberForm";
import { VehicleForm } from "@/components/vehicleApplication/VehicleForm";
import { useCreateVehicleApplication } from "@/hooks/vehicleApplication/useCreateVehicleApplication";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

export interface SchoolMemberDetailsForm {
  schoolId: string;
  firstName: string;
  lastName: string;
  userType: string;
  schoolCredential: string;
}

export interface DriverDetailsForm {
  firstName: string;
  lastName: string;
  licenseId: string;
  licenseImage: string;
  driverSelfiePicture: string;
}

export interface VehicleDetailsForm {
  make: string;
  series: string;
  type: string;
  model: string;
  licensePlate: string;
  certificateOfRegistration: string;
  officialReceipt: string;
  frontImage: string;
  backImage: string;
  sideImage: string;
}

const validationMessages = {
  schoolMember: {
    schoolId: "School ID is required",
    firstName: "First Name is required",
    lastName: "Last Name is required",
    useType: "Use Type is required",
    schoolCredential: "School Credential is required"
  },
  driverDetails: {
    firstName: "First Name is required in DriverDetails",
    lastName: "Last Name is required in DriverDetails",
    licenseId: "License ID is required",
    licenseImage: "License Image is required"
  },
  vehicleDetails: {
    make: "Make is required",
    series: "Series is required",
    type: "Type is required",
    model: "Model is required",
    licensePlate: "License Plate is required",
    certificateOfRegistration: "Certificate of Registration is required",
    officialReceipt: "Official Receipt is required",
    frontImage: "Front Image is required",
    backImage: "Back Image is required",
    sideImage: "Side Image is required"
  }
};

export default function Register() {
  const [schoolMember, setSchoolMember] = useState<SchoolMemberDetailsForm>({
    schoolId: "",
    firstName: "",
    lastName: "",
    userType: "",
    schoolCredential: ""
  });
  const [driverDetails, setDriverDetails] = useState<DriverDetailsForm>({
    firstName: "",
    lastName: "",
    licenseId: "",
    licenseImage: "",
    driverSelfiePicture: ""
  });
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetailsForm>({
    make: "",
    series: "",
    type: "",
    model: "",
    licensePlate: "",
    certificateOfRegistration: "",
    officialReceipt: "",
    frontImage: "",
    backImage: "",
    sideImage: ""
  });

  const validateValues = () => {
    for (const key in schoolMember) {
      const value = schoolMember[key as keyof SchoolMemberDetailsForm];
      if (!value || value === "") {
        alert(validationMessages.schoolMember[key as keyof typeof validationMessages.schoolMember]);
        return false;
      }
    }

    for (const key in driverDetails) {
      const value = driverDetails[key as keyof DriverDetailsForm];
      if (!value || value === "") {
        alert(
          validationMessages.driverDetails[key as keyof typeof validationMessages.driverDetails]
        );
        return false;
      }
    }

    for (const key in vehicleDetails) {
      const value = vehicleDetails[key as keyof VehicleDetailsForm];
      if (!value || value === "") {
        alert(
          validationMessages.vehicleDetails[key as keyof typeof validationMessages.vehicleDetails]
        );
        return false;
      }
    }

    return true;
  };

  const { mutate: createVehicleApplication, isPending: isLoading } = useCreateVehicleApplication();
  const handleSubmit = async () => {
    const isFormValid = validateValues();
    if (!isFormValid) {
      return;
    }

    createVehicleApplication(
      {
        schoolId: schoolMember.schoolId,
        firstName: schoolMember.firstName,
        lastName: schoolMember.lastName,
        userType: schoolMember.userType as "STUDENT" | "STAFF",
        schoolCredential: schoolMember.schoolCredential,

        driverFirstName: driverDetails.firstName,
        driverLastName: driverDetails.lastName,
        driverLicenseId: driverDetails.licenseId,
        driverLicenseImage: driverDetails.licenseImage,
        driverSelfiePicture: driverDetails.driverSelfiePicture,

        make: vehicleDetails.make,
        series: vehicleDetails.series,
        type: vehicleDetails.type,
        model: vehicleDetails.model,
        licensePlate: vehicleDetails.licensePlate,
        certificateOfRegistration: vehicleDetails.certificateOfRegistration,
        officialReceipt: vehicleDetails.officialReceipt,
        frontImage: vehicleDetails.frontImage,
        backImage: vehicleDetails.backImage,
        sideImage: vehicleDetails.sideImage
      },
      {
        onSuccess: () => {
          alert("Vehicle Application Submitted Successfully");
          router.replace("/(user)");
        },
        onError: (error) => {
          alert(`Failed to submit vehicle application: ${error.message}`);
        }
      }
    );
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require("../../assets/images/neu-logo.png")} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>UNITRAFFIC</Text>
              <Text style={styles.headerSubTitle}>Vehicle Sticker Application Form</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.body}>
            <View style={styles.section}>
              <SchoolMemberInformationForm setSchoolMember={setSchoolMember} />
            </View>
            <View style={styles.section}>
              <DriverForm setDriverDetails={setDriverDetails} />
            </View>
            <View style={styles.section}>
              <VehicleForm setVehicleDetails={setVehicleDetails} />
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.button} onPress={handleCancel} disabled={isLoading}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={StyleSheet.compose(styles.button, isLoading && styles.loading)}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {!isLoading ? (
                  <Text style={styles.buttonText}>Submit</Text>
                ) : (
                  <View style={styles.submitButtonContainer}>
                    <ActivityIndicator size={"small"} color="white" style={styles.loader} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  submitButtonContainer: {
    flexDirection: "row"
  },
  loader: {
    marginRight: 10
  },
  mainContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#EBEAF0",
    width: "100%",
    minHeight: 300
  },
  headerSubTitle: {
    fontSize: 18,
    color: "white"
  },
  headerContainer: {
    backgroundColor: "black",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  textContainer: {
    justifyContent: "center"
  },
  logo: {
    height: 60,
    width: 60
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  headerText: {
    color: "white",
    fontSize: 40
  },
  titleContainer: {
    flexDirection: "row"
  },
  body: {
    padding: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  sectionContainer: {
    padding: 10
  },
  section: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  buttonText: {
    color: "white",
    fontSize: 16
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#20201F",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "flex-end",
    width: "40%",
    justifyContent: "center",
    height: 40
  },
  loading: {
    backgroundColor: "#71797E",
    borderColor: "#71797E"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    columnGap: 10
  }
});
