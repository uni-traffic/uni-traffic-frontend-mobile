import { View, Text, StyleSheet, FlatList } from "react-native";
import type { VehicleApplication } from "@/lib/types";
import { AntDesign } from "@expo/vector-icons";

interface VehicleApplicationProps {
  vehicleApplications: VehicleApplication[];
}

export const ApplicationsTab = ({ vehicleApplications }: VehicleApplicationProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Approved":
        return { backgroundColor: "rgba(16, 185, 129, 0.2)", color: "#10B981" };
      case "Pending":
        return { backgroundColor: "rgba(234, 179, 8, 0.2)", color: "#EAB308" };
      default:
        return { backgroundColor: "rgba(239, 68, 68, 0.2)", color: "#EF4444" };
    }
  };

  const renderItem = ({ item }: { item: VehicleApplication }) => {
    const statusStyle = getStatusStyle(item.status);
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>
              {item.vehicle.make} {item.vehicle.series}
            </Text>
            <Text style={styles.subText}>Plate: {item.vehicle.licensePlate}</Text>
          </View>
          <Text
            style={[
              styles.status,
              { backgroundColor: statusStyle.backgroundColor, color: statusStyle.color }
            ]}
          >
            {item.status}
          </Text>
        </View>

        <View style={{ gap: 4 }}>
          <Text style={styles.subText}>Application Date: {formatDate(item.createdAt)}</Text>
          {item.stickerNumber && (
            <Text style={styles.subText}>Sticker No.: {item.stickerNumber}</Text>
          )}
          {item.remarks && <Text style={styles.subText}>Remarks: {item.remarks}</Text>}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {vehicleApplications.length > 0 ? (
        <FlatList
          data={vehicleApplications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 16 }}
        />
      ) : (
        <View style={styles.emptyState}>
          <AntDesign name="filetext1" size={35} color="white" style={{ opacity: 0.5 }} />
          <Text style={styles.emptyText}>No active applications</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white"
  },
  card: {
    backgroundColor: "#2C2C2C",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 4
  },
  subText: {
    fontSize: 13,
    color: "white"
  },
  status: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignSelf: "flex-start",
    fontWeight: "500"
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64
  },
  emptyText: {
    color: "white"
  }
});
