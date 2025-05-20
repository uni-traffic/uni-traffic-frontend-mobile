import { NeuImage } from "@/components/common/NeuImage";
import type { ViolationRecord } from "@/lib/types";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ViolationCardProps {
  record: ViolationRecord;
}
export const ViolationCollapsible = ({ record }: ViolationCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { date, status, violation, reporter, vehicle, remarks } = record;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Feather name="alert-triangle" color="#facc15" size={25} style={styles.icon} />
            <View style={{ width: "100%", paddingRight: 10 }}>
              <Text style={styles.title} numberOfLines={1}>
                {violation?.violationName}
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text
                style={[
                  styles.statusText,
                  status.toUpperCase() === "PAID" ? styles.resolvedBadge : styles.unresolvedBadge
                ]}
              >
                {status}
              </Text>
            </View>
            {expanded ? (
              <Feather name="chevron-up" size={20} color="#8E9196" />
            ) : (
              <Feather name="chevron-down" size={20} color="#8E9196" />
            )}
          </View>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <Text style={styles.infoText}>{`Violation: ${violation?.violationName}`}</Text>
          <Text style={styles.infoText}>{`Date: ${formattedDate}`}</Text>
          <Text style={styles.infoText}>
            Reported by: {reporter ? `${reporter.firstName} ${reporter.lastName}` : "Unknown"}
          </Text>
          <Text style={styles.infoText}>
            Vehicle: {vehicle ? `${vehicle.model} ${vehicle.series} ${vehicle.make} ` : "Unknown"}
          </Text>
          <Text style={styles.infoText}>
            License Plate: {`${vehicle?.licensePlate ? vehicle?.licensePlate : "Unknown"}`}
          </Text>

          <Text style={styles.sectionLabel}>Photos:</Text>
          <View
            style={{
              flexDirection: "row",
              height: 150,
              width: "100%",
              justifyContent: "center"
            }}
          >
            {record.evidence.length > 0
              ? record.evidence.map((evidence, index) => {
                  return (
                    <View style={[{ flex: 1 }, index === 0 && { marginRight: 2 }]} key={index}>
                      <NeuImage image={evidence} />
                    </View>
                  );
                })
              : null}
          </View>

          <Text style={styles.sectionLabel}>Remarks:</Text>
          <View style={styles.remarksBox}>
            <Text style={styles.remarksText}>{remarks || "No remarks"}</Text>
          </View>

          <View style={styles.penaltyBox}>
            <Text style={styles.penaltyLabel}>Penalty:</Text>
            <Text style={styles.penaltyValue}>₱{violation?.penalty?.toLocaleString() || "0"}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: "100%",
    marginBottom: 5
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: {
    width: "60%",
    flexDirection: "row",
    gap: 12,
    alignItems: "center"
  },
  icon: {
    marginRight: 8
  },
  title: {
    color: "black",
    fontWeight: "600",
    fontSize: 16
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    minWidth: 90,
    gap: 8
  },
  resolvedBadge: {
    backgroundColor: "#1fb646"
  },
  unresolvedBadge: {
    backgroundColor: "#ff0000"
  },
  statusText: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "500",
    textAlign: "center"
  },
  content: {
    backgroundColor: "white",
    padding: 16,
    gap: 12
  },
  infoText: {
    color: "black",
    fontSize: 13
  },
  sectionLabel: {
    color: "black",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 10
  },
  remarksBox: {
    backgroundColor: "#EBEAF0",
    padding: 12,
    borderRadius: 8
  },
  remarksText: {
    color: "black",
    fontSize: 13
  },
  penaltyBox: {
    backgroundColor: "#EBEAF0",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  penaltyLabel: {
    color: "black",
    fontSize: 13
  },
  penaltyValue: {
    color: "red",
    fontWeight: "600",
    fontSize: 15
  }
});
