import type { ViolationRecord } from "@/lib/types";
import { format } from "date-fns";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const Violation = ({ violations }: { violations: ViolationRecord[] }) => {
  return (
    <>
      {/* Violation details */}
      <View style={styles.containerInfo}>
        {/* Violation details header */}
        <View style={styles.containerInfoHeader}>
          <View style={styles.containerInfoContent}>
            <Image source={require("../../assets/images/violation-icon.png")} />
            <Text style={styles.title}>Violation History</Text>
          </View>
        </View>
        {/* Violation details body */}
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
          violations
            .slice()
            .reverse()
            .map((violation) => (
              <React.Fragment key={violation.id}>
                <View style={styles.containerInfoBody}>
                  <View style={styles.containerRow}>
                    <Text style={styles.titleBody}>{violation.violation?.violationName}</Text>
                    <Text style={styles.textDate}>
                      {format(new Date(violation.date).toString(), "MMMM dd yyyy")}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[
                        violation.status === "UNPAID" ? styles.textPending : styles.textResolved
                      ]}
                    >
                      {violation.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.separator} />
              </React.Fragment>
            ))
        )}
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
    width: "95%",
    backgroundColor: "#EBEAF0",
    margin: "2%",
    padding: "3%",
    borderRadius: 10
  },
  containerRow: {
    width: "80%",
    height: "100%"
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
  },
  marginBlock: {
    margin: 20
  },
  textPending: {
    backgroundColor: "#FB2727",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    padding: 4,
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12
  },
  textResolved: {
    backgroundColor: "#03CD09",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 10
  },
  textDate: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.5,
    color: "#757575"
  }
});
