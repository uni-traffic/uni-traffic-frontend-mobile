import type { ViolationRecord } from "@/lib/types";
import { Feather } from "@expo/vector-icons";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ViolationCard } from "./violatin-card";

interface ViolationsTabProps {
  violations: ViolationRecord[];
}

export const ViolationsTab = ({ violations }: ViolationsTabProps) => {
  const renderItem = ({ item }: { item: ViolationRecord }) => <ViolationCard record={item} />;

  return (
    <View style={styles.container}>
      {violations.length > 0 ? (
        <FlatList
          data={violations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12 }}
        />
      ) : (
        <View style={styles.emptyState}>
          <Feather name="alert-triangle" size={35} color="white"  />
          <Text style={styles.emptyText}>No violations recorded</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2C2C",
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    marginBottom: 12
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 64
  },
  emptyText: {
    color: "white"
  }
});
