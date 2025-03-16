import { ComingSoon } from "@/components/coming-soon";
import type { User, Vehicle } from "@/lib/types";
import { FontAwesome } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const user: User = {
  id: faker.string.uuid(),
  username: faker.word.sample({ length: 15 }),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  role: "SECURITY"
};

const vehicle = (): Vehicle => ({
  id: faker.string.uuid(),
  ownerId: user.id,
  licensePlate: faker.vehicle.vrm().toUpperCase(),
  make: faker.vehicle.manufacturer(),
  model: faker.date.past().getFullYear().toString(),
  series: faker.vehicle.model(),
  color: faker.vehicle.color(),
  type: faker.helpers.arrayElement(["CAR", "MOTORCYCLE"]),
  images: [faker.image.url(), faker.image.url(), faker.image.url()],
  stickerNumber: "12345678",
  status: faker.helpers.arrayElement(["REGISTERED", "PENDING"]),
  owner: user
});

const scannedVehicles: Vehicle[] = Array.from({ length: 6 }, vehicle);

const SecurityDashboard = () => {
  const router = useRouter();
  const [licensePlate, setLicensePlate] = useState("");

  const handleSearchSubmit = () => {
    router.push(`/vehicle?licensePlate=${licensePlate.replace(" ", "").toLowerCase()}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <FontAwesome name="shield" size={58} color="white" style={styles.icon} />
          <Text style={styles.headerText}>SECURITY</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
            placeholder="Search License Plate"
            style={styles.headerSearch}
            onChangeText={setLicensePlate}
            onSubmitEditing={handleSearchSubmit}
          />
          <TouchableOpacity style={styles.button} onPress={handleSearchSubmit}>
            <FontAwesome name="search" size={16} color="black" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.recentlyScannedVehicle}>
        <ComingSoon />
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recently Scanned Vehicles</Text>
        </View>
        <View style={styles.scannedVehicleContainer}>
          <FlatList
            data={scannedVehicles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.vehicleItem}>
                <FontAwesome name="car" size={20} color="black" />
                <View style={styles.vehicleInfo}>
                  <Text style={styles.licenseNumber}>{item.licensePlate}</Text>
                  <Text style={styles.timestamp}>{format(faker.date.past(), "hh:mm a")}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.viewDetails}>View Details</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    width: "100%"
  },
  header: {
    backgroundColor: "black",
    width: "100%",
    padding: 20
  },
  headerSearch: {
    width: "60%",
    height: 40,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "white",
    paddingLeft: 10,
    textAlign: "left"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  icon: {
    marginRight: 30
  },
  headerText: {
    color: "white",
    fontSize: 62,
    lineHeight: 72
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black"
  },
  buttonIcon: {
    marginRight: 5,
    paddingLeft: 4
  },
  buttonText: {
    color: "black",
    fontSize: 16
  },
  recentlyScannedVehicle: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    alignSelf: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 20,
    marginBottom: 20
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    paddingHorizontal: 2
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  scannedVehicleContainer: {
    marginTop: 10
  },
  vehicleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBEAF0",
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 50
  },
  licenseNumber: {
    fontSize: 16,
    fontWeight: "bold"
  },
  timestamp: {
    fontSize: 12,
    color: "gray"
  },
  viewDetails: {
    color: "blue",
    fontSize: 14
  }
});

export default SecurityDashboard;
