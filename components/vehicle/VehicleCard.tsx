import type { Vehicle } from "@/lib/types";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <>
      {/* Vehicle details */}
      <View style={styles.containerInfo}>
        {/* Vehicle details header */}
        <View style={styles.containerInfoHeader}>
          <View style={styles.containerInfoContent}>
            {vehicle.type === "CAR" ? (
              <FontAwesome name="car" size={18} color="black" />
            ) : (
              <Fontisto name="motorcycle" size={18} color="black" />
            )}
            <Text style={styles.title}>Vehicle Details</Text>
          </View>
        </View>

        {/* Vehicle details body */}
        <VehicleInfoBody title="Type" value={vehicle.type} />
        <VehicleInfoBody title="Make" value={vehicle.make} />
        <VehicleInfoBody title="Series" value={vehicle.series} />
        <VehicleInfoBody title="Model" value={vehicle.model} />
        <VehicleInfoBody title="License Plate" value={vehicle.licensePlate} />
        <VehicleInfoBody title="Sticker Number" value={vehicle.stickerNumber} />
      </View>
    </>
  );
};

const VehicleInfoBody = ({ title, value }: { title: string; value: string | number }) => {
  return (
    <View style={styles.containerInfoBody}>
      <View style={styles.containerInfoContent}>
        <Text style={styles.titleBody}>{title}</Text>
      </View>
      <View style={styles.containerInfoContent}>
        <Text style={styles.infoBody}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInfo: {
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    margin: "2%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: "2%",
    paddingVertical: "1%"
  },
  containerInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 20,
    width: "95%",
    backgroundColor: "#EBEAF0",
    margin: "2%",
    padding: "3%",
    borderRadius: 10
  },
  containerInfoContent: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  containerInfoBody: {
    width: "95%",
    margin: "2%",
    padding: "3%",
    minHeight: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  title: {
    fontSize: 20,
    fontFamily: "ROBOTO",
    fontWeight: "400",
    marginHorizontal: 8
  },
  titleBody: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold"
  },
  infoBody: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "400"
  }
});
