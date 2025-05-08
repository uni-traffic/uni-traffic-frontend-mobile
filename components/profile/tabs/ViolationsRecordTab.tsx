import { ViolationCard } from "@/components/common/ViolationCard";
import { useAuth } from "@/context/AuthContext";
import { useViolationRecords } from "@/hooks/violationRecord/useViolationRecords";
import type { ViolationRecord } from "@/lib/types";
import { Feather } from "@expo/vector-icons";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export const ViolationsRecordTab = () => {
  const { user } = useAuth();

  const {
    data: violationRecordData,
    isPending,
    refetch,
    isRefetching
  } = useViolationRecords({
    userId: user?.id,
    count: 10,
    page: 1
  });

  const violationRecords = violationRecordData?.violation ?? [];

  return (
    <View style={styles.container}>
      {isPending ? (
        <View style={styles.emptyState}>
          <Text
            style={{
              fontSize: 16
            }}
          >
            Loading...
          </Text>
        </View>
      ) : violationRecords && violationRecords.length > 0 ? (
        <FlatList
          data={violationRecords}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: ViolationRecord }) => <ViolationCard record={item} />}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => {
                refetch();
              }}
              colors={["#9Bd35A", "#689F38"]}
              tintColor="#689F38"
            />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Feather name="alert-triangle" size={35} color="#000000" style={{ marginBottom: 15 }} />
          <Text
            style={{
              fontSize: 16
            }}
          >
            No violations recorded
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 10
  },
  listContent: {
    gap: 12
  },
  emptyState: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
