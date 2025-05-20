import { ViolationCollapsible } from "@/components/common/ViolationCollapsible";
import type { ViolationRecord } from "@/lib/types";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export const ViolationsCard = ({ violations }: { violations: ViolationRecord[] }) => {
  return (
    <>
      {/* Violation details */}
      <View style={styles.containerInfo}>
        {/* Violation details header */}
        <View style={styles.containerInfoHeader}>
          <View style={styles.containerInfoContent}>
            <Entypo name="traffic-cone" size={24} color="black" />
            <Text style={styles.title}>Violation History</Text>
          </View>
        </View>
        {/* Violation details body */}
        <View style={{ width: "100%" }}>
          {violations.length === 0 ? (
            <>
              <View style={styles.containerInfoBody}>
                <View style={styles.containerInfoContent}>
                  <Text style={styles.titleBody}>No violations found</Text>
                </View>
              </View>
              <View style={styles.separator} />
              <View style={styles.marginBlock} />
            </>
          ) : (
            violations.map((violation) => (
              <ViolationCollapsible key={violation.id} record={violation} />
            ))
          )}
        </View>
      </View>
    </>
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
    width: "100%",
    backgroundColor: "#EBEAF0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2
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
    fontWeight: "400"
  },
  separator: {
    height: 2,
    width: "85%"
  },
  marginBlock: {
    margin: 20
  }
});
