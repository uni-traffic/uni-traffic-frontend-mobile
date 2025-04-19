import type { VehicleApplication } from "@/lib/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface VehicleTabProps {
  vehicles: VehicleApplication[];
}
export const VehicleTab = ({ vehicles }: VehicleTabProps) => {
  const router = useRouter();
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const renderItem = ({ item }: { item: VehicleApplication }) => (
    <TouchableOpacity onPress={() => router.push(
      `/vehicle?licensePlate=${"959CIP"}`
    )}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {item.vehicle.make} {item.vehicle.series}
            </Text>
            <Text style={styles.details}>
              Model: {item.vehicle.model} Type: {item.vehicle.type} Plate:{" "}
              {item.vehicle.licensePlate}
            </Text>
            <Text style={styles.details}>Application Date: {formatDate(item.createdAt)}</Text>
          </View>

          {item.status === "Approved" && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {vehicles.length > 0 ? (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12 }}
        />
      ) : (
        <View style={styles.emptyState}>
          <FontAwesome5 name="car-side" size={35} color="white" style={{ opacity: 0.5 }} />
          <Text style={styles.emptyText}>No vehicles registered yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#2C2C2C"
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 16
  },
  card: {
    backgroundColor: "#2C2C2C",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 4
  },
  details: {
    fontSize: 13,
    color: "white",
    marginBottom: 2
  },
  badge: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start"
  },
  badgeText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "500"
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64
  },
  emptyText: {
    marginTop: 8,
    color: "white"
  }
});
