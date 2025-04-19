import type { ViolationRecord } from "@/lib/types";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ViolationCardProps {
  record: ViolationRecord;
}
export const ViolationCard = ({ record }: ViolationCardProps) => {
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
            <View>
              <Text style={styles.title}>{violation?.violationName}</Text>
              <Text style={styles.subtitle}>{violation?.category}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View
              style={[
                styles.statusBadge,
                status.toLowerCase() === "resolved" ? styles.resolvedBadge : styles.unresolvedBadge
              ]}
            >
              <Text style={styles.statusText}>{status}</Text>
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
          <Text style={styles.infoText}>{formattedDate}</Text>
          <Text style={styles.infoText}>
            Reported by: {reporter ? `${reporter.firstName} ${reporter.lastName}` : "Unknown"}
          </Text>
          <Text style={styles.infoText}>
            Vehicle:{" "}
            {vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})` : "Unknown"}
          </Text>

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
    backgroundColor: "#2C2C2C",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "white"
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center"
  },
  icon: {
    marginRight: 8
  },
  title: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16
  },
  subtitle: {
    color: "white",
    fontSize: 13
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20
  },
  resolvedBadge: {
    backgroundColor: "#F2FCE2"
  },
  unresolvedBadge: {
    backgroundColor: "#FFA500"
  },
  statusText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500"
  },
  content: {
    backgroundColor: "#2C2C2C",
    padding: 16,
    gap: 12
  },
  infoText: {
    color: "#8E9196",
    fontSize: 13
  },
  sectionLabel: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 10
  },
  remarksBox: {
    backgroundColor: "#1A1F2C",
    padding: 12,
    borderRadius: 8
  },
  remarksText: {
    color: "#8E9196",
    fontSize: 13
  },
  penaltyBox: {
    backgroundColor: "#1A1F2C",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  penaltyLabel: {
    color: "#8E9196",
    fontSize: 13
  },
  penaltyValue: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15
  }
});
