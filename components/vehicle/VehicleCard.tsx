import { CardDataRow } from "@/components/common/CardDataRow";
import { NeuImage } from "@/components/common/NeuImage";
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
        <CardDataRow title="Type" value={vehicle.type} />
        <CardDataRow title="Make" value={vehicle.make} />
        <CardDataRow title="Series" value={vehicle.series} />
        <CardDataRow title="Model" value={vehicle.model} />
        <CardDataRow title="License Plate" value={vehicle.licensePlate} />
        <CardDataRow title="Sticker Number" value={vehicle.stickerNumber} />
        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
            paddingTop: 5
          }}
        >
          <Text style={styles.titleBody}>Vehicle Images</Text>
          <View
            style={{
              height: 150,
              width: "100%",
              flexDirection: "row",
              marginTop: 5,
              paddingBottom: 5
            }}
          >
            <View style={{ flex: 1, marginRight: 2 }}>
              <NeuImage image={vehicle.images.front} cover={true} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, marginBottom: 3 }}>
                <NeuImage image={vehicle.images.side} cover={true} />
              </View>
              <View style={{ flex: 1 }}>
                <NeuImage image={vehicle.images.back} cover={true} />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
            paddingTop: 5
          }}
        >
          <Text style={styles.titleBody}>Documents</Text>
          <View
            style={{
              height: 150,
              width: "100%",
              flexDirection: "row",
              marginTop: 5,
              paddingBottom: 5
            }}
          >
            <View style={{ flex: 1, marginRight: 2 }}>
              <NeuImage image={vehicle.images.registration} cover={true} />
            </View>
            <View style={{ flex: 1 }}>
              <NeuImage image={vehicle.images.receipt} cover={true} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerInfo: {
    alignItems: "center",
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
    width: "100%",
    backgroundColor: "#EBEAF0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2
  },
  containerInfoContent: {
    flexDirection: "row",
    alignItems: "center"
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
  }
});
