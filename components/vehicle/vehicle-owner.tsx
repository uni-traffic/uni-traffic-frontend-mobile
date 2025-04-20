import type { User } from "@/lib/types";
import { Image, StyleSheet, Text, View } from "react-native";

export const VehicleOwner = ({ owner }: { owner: User }) => {
  return (
    <>
      {/* Owner details */}
      <View style={styles.containerInfo}>
        {/* Vehicle details header */}
        <View style={styles.containerInfoHeader}>
          <View style={styles.containerInfoContent}>
            <Image source={require("../../assets/images/user-icon.png")} />
            <Text style={styles.title}>Owner Details</Text>
          </View>
        </View>
        {/* Owner details body */}
        <View style={styles.containerInfoBody}>
          <View style={styles.containerInfoContent}>
            <Text style={styles.titleBody}>Name</Text>
          </View>
          <View style={styles.containerInfoContent}>
            <Text style={styles.infoBody}>{`${owner.firstName} ${owner.lastName}`}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.containerInfoBody}>
          <View style={styles.containerInfoContent}>
            <Text style={styles.titleBody}>Type</Text>
          </View>
          <View style={styles.containerInfoContent}>
            <Text style={styles.infoBody}>{owner.role}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const VehicleInfoRow = ({ title, value }: { title: string; value: string | number }) => {
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
    fontWeight: "400"
  },
  infoBody: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold"
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
  }
});
