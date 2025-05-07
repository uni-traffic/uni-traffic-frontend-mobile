import type { VehicleApplication } from "@/lib/types";
import { formatDate, formatStatus, getStatusStyle } from "@/lib/utils";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const VehicleApplicationCard = ({
  vehicleApplication,
  onPress
}: {
  vehicleApplication: VehicleApplication;
  onPress: () => void;
}) => {
  const statusStyle = getStatusStyle(vehicleApplication.status);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>
            {vehicleApplication.vehicle.make} {vehicleApplication.vehicle.series}
          </Text>
          <Text style={styles.subText}>Plate: {vehicleApplication.vehicle.licensePlate}</Text>
        </View>
        <Text
          style={[
            styles.status,
            { backgroundColor: statusStyle.backgroundColor, color: statusStyle.color }
          ]}
        >
          {formatStatus(vehicleApplication.status)}
        </Text>
      </View>

      <View style={{ gap: 4 }}>
        <Text style={styles.subText}>
          Application Date: {formatDate(vehicleApplication.createdAt)}
        </Text>
        {vehicleApplication.stickerNumber && (
          <Text style={styles.subText}>Sticker No.: {vehicleApplication.stickerNumber}</Text>
        )}
        {vehicleApplication.remarks && (
          <Text style={styles.subText}>Remarks: {vehicleApplication.remarks}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    width: "100%",
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
  }
});
