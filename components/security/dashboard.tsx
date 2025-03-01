import { ComingSoon } from "@/components/coming-soon";
import type { User, Vehicle } from "@/lib/types";
import { FontAwesome } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  isActive: faker.datatype.boolean(),
  owner: user
});

const scannedVehicles: Vehicle[] = Array.from({ length: 6 }, vehicle);

const SecurityDashboard = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <FontAwesome name="shield" size={58} color="white" style={styles.icon} />
          <Text style={styles.headerText}>SECURITY</Text>
        </View>
        {/* Delete before pushing */}
        {/*<TouchableOpacity*/}
        {/*  style={styles.button}*/}
        {/*  onPress={() => router.push("/vehicle?licensePlate=959CIP")}*/}
        {/*>*/}
        {/*  <FontAwesome name="file-text-o" size={16} color="black" style={styles.buttonIcon} />*/}
        {/*  <Text style={styles.buttonText}>Redirect</Text>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity style={styles.button} onPress={() => router.push("/violation")}>
          <FontAwesome name="file-text-o" size={16} color="black" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>New Violation</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginRight: 30,
    marginLeft: 20
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "flex-end",
    marginTop: 10
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
