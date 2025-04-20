import { useAuth } from "@/context/authContext";
import { useVehicleApplications } from "@/hooks/violationRecord/useVehicleApplications";
import type { VehicleApplication } from "@/lib/types";
import { AntDesign } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";

export const ApplicationsTab = () => {
  const { user } = useAuth();
  const { data: vehicleApplications, isPending } = useVehicleApplications({
    applicantId: user?.id,
    count: 10,
    page: 1
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const getStatusStyle = (status: string) => {
    const formattedStatus = status.toUpperCase();

    switch (formattedStatus) {
      case "APPROVED":
        return { backgroundColor: "rgb(0,255,60)", color: "#ffffff" };
      case "REJECTED":
        return { backgroundColor: "rgb(255,0,0)", color: "#ffffff" };
      default:
        return { backgroundColor: "rgb(243,182,27)", color: "#ffffff" };
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
      {!isPending && vehicleApplications && vehicleApplications.length > 0 ? (
        <FlatList
          data={vehicleApplications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 16 }}
        />
      ) : (
        <View style={styles.emptyState}>
          <AntDesign name="filetext1" size={35} color="#000000" style={{ opacity: 0.5 }} />
          <Text style={styles.emptyText}>No Vehicle Applications Found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#eee"
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
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "white",
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4
  },
  subText: {
    fontSize: 13,
    color: "#000000"
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
    marginTop: 6,
    color: "black"
  }
});
