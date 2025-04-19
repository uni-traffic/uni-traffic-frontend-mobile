import type { Vehicle } from "@/lib/types";
import { Image, StyleSheet, Text, View } from "react-native";

export const VehicleDetails = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <>
      {/* Vehicle details */}
      <View style={styles.containerInfo}>
        {/* Vehicle details header */}
        <View style={styles.containerInfoHeader}>
          <View style={styles.containerInfoContent}>
            <Image source={require("../../assets/images/car-icon.png")} />
            <Text style={styles.title}>Vehicle Details</Text>
          </View>
          <View style={styles.containerInfoContent}>
            <Text
              style={[vehicle.status === "REGISTERED" ? styles.textActive : styles.textInactive]}
            >
              {vehicle.status}
            </Text>
          </View>
        </View>

         {/* Vehicle Image */}
         {vehicle.images?.length > 0 && (
          <Image
            source={require("@/assets/images/neu-camp.png")}
            style={styles.vehicleImage}
            resizeMode="contain"
          />
        )}

        {/* Vehicle details body */}
        <VehicleInfoBody title="Type" value={vehicle.type} />
        <VehicleInfoBody title="Make" value={vehicle.make} />
        <VehicleInfoBody title="Series" value={vehicle.series} />
        <VehicleInfoBody title="Model" value={vehicle.model} />
        <VehicleInfoBody title="Color" value={vehicle.color.toUpperCase()} />
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
    flex: 1,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flex: 1,
    width: "95%",
    margin: "2%",
    padding: "3%",
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
  },
  separator: {
    height: 2,
    width: "85%"
  },
  textActive: {
    backgroundColor: "#03CD09",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  textInactive: {
    backgroundColor: "#FB2727",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  vehicleImage: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10
  }
});
