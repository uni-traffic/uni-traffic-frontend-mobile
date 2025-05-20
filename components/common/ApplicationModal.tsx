import { ImageContainer } from "@/components/common/ImageContainer";
import type { VehicleApplication } from "@/lib/types";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface VehicleStickerApplicationModalProps {
  vehicleApplication: VehicleApplication;
  closeModal: () => void;
}

export const VehicleStickerApplicationModal = ({
  vehicleApplication,
  closeModal
}: VehicleStickerApplicationModalProps) => {
  return (
    <ScrollView style={newStyle.container}>
      <View style={newStyle.header}>
        <View style={newStyle.titleContainer}>
          <Image style={newStyle.logo} source={require("../../assets/images/neu-logo.png")} />
          <View style={newStyle.textContainer}>
            <Text style={newStyle.headerText}>UNITRAFFIC</Text>
          </View>
        </View>
      </View>
      <View style={newStyle.body}>
        <View style={newStyle.section}>
          <PropertyValue label={"Reference ID:"} value={vehicleApplication.id} />
          <PropertyValue label={"Status: "} value={getFormattedStatus(vehicleApplication.status)} />

          {vehicleApplication.remarks ? (
            <View>
              <Text style={newStyle.label}>Remarks: </Text>
              <View style={[newStyle.box, newStyle.textArea]}>
                <Text style={newStyle.displayText}>{vehicleApplication.remarks}</Text>
              </View>
            </View>
          ) : null}
        </View>
        <View style={newStyle.section}>
          <PropertyValue label={"School ID:"} value={vehicleApplication.schoolMember.schoolId} />
          <PropertyValue label={"First Name:"} value={vehicleApplication.schoolMember.firstName} />
          <PropertyValue label={"Last Name:"} value={vehicleApplication.schoolMember.lastName} />

          <ImageProperty
            label={"Drivers License: "}
            image={vehicleApplication.schoolMember.schoolCredential}
          />
        </View>

        <View style={newStyle.section}>
          <PropertyValue label={"License ID:"} value={vehicleApplication.driver.licenseId} />
          <PropertyValue label={"First Name:"} value={vehicleApplication.driver.firstName} />
          <PropertyValue label={"Last Name:"} value={vehicleApplication.driver.lastName} />

          <ImageProperty
            label={"Driver's License: "}
            image={vehicleApplication.driver.licenseImage}
          />
          <ImageProperty
            label={"Driver's Selfie Picture: "}
            image={vehicleApplication.driver.selfiePicture}
          />
        </View>

        <View style={newStyle.section}>
          <PropertyValue label={"Make:"} value={vehicleApplication.vehicle.make} />
          <PropertyValue label={"Model: "} value={vehicleApplication.vehicle.model} />
          <PropertyValue label={"Series: "} value={vehicleApplication.vehicle.series} />
          <PropertyValue label={"Type: "} value={vehicleApplication.vehicle.type} />
          <PropertyValue
            label={"License Plate: "}
            value={vehicleApplication.vehicle.licensePlate}
          />

          <ImageProperty
            label={"Certificate of Registration: "}
            image={vehicleApplication.vehicle.certificateOfRegistration}
          />
          <ImageProperty
            label={"Official Receipt: "}
            image={vehicleApplication.vehicle.officialReceipt}
          />
          <ImageProperty label={"Front Image: "} image={vehicleApplication.vehicle.frontImage} />
          <ImageProperty label={"Side Image: "} image={vehicleApplication.vehicle.sideImage} />
          <ImageProperty label={"Rear Image: "} image={vehicleApplication.vehicle.backImage} />
        </View>

        <View style={newStyle.buttonContainer}>
          <TouchableOpacity style={newStyle.button} onPress={() => closeModal()}>
            <Text style={newStyle.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const getFormattedStatus = (rawStatus: string): string => {
  let status: string;

  switch (rawStatus) {
    case "APPROVED":
      status = "Approved";
      break;
    case "PENDING_FOR_STICKER":
      status = "Waiting for Sticker";
      break;
    case "PENDING_FOR_PAYMENT":
      status = "Waiting for Payment";
      break;
    case "PENDING_FOR_SECURITY_APPROVAL":
      status = "Pending for Security Approval";
      break;
    case "REJECTED":
      status = "Rejected";
      break;
    default:
      status = "Unknown";
  }

  return status;
};

const newStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEAF0"
  },
  header: {
    backgroundColor: "black",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  titleContainer: {
    flexDirection: "row",
    alignSelf: "center"
  },
  headerText: {
    color: "white",
    fontSize: 40,
    alignSelf: "flex-start"
  },
  logo: {
    height: 60,
    width: 60,
    marginRight: 20
  },
  textContainer: {
    justifyContent: "center"
  },
  body: {
    padding: 20
  },
  section: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10
  },
  label: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start"
  },
  box: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f5f5f5",
    width: "100%"
  },
  textArea: {
    minHeight: 80,
    maxHeight: 80,
    textAlignVertical: "top",
    backgroundColor: "white"
  },
  displayText: {
    fontSize: 14,
    color: "#000"
  },
  button: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20201F",
    borderRadius: 4
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center"
  }
});

const ImageProperty = ({ label, image }: { image: string; label: string }) => {
  return (
    <View style={subStyle.imageProperty}>
      <Text style={subStyle.label}>{label}</Text>
      <ImageContainer image={image} />
    </View>
  );
};

const PropertyValue = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={subStyle.property}>
      <Text style={subStyle.label}>{label}</Text>
      <Text style={subStyle.value}>{value}</Text>
    </View>
  );
};

const subStyle = StyleSheet.create({
  imageProperty: {
    width: "100%",
    marginTop: 5
  },
  label: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start"
  },
  property: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imageHolder: {
    borderRadius: 8,
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 200
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    resizeMode: "contain"
  },
  value: {
    fontSize: 14
  }
});
