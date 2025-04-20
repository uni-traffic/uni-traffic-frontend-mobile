import { ViolationCard } from "@/components/profile/violatin-card";
import { useAuth } from "@/context/authContext";
import { useViolationRecords } from "@/hooks/violationRecord/useViolationRecords";
import type { ViolationRecord } from "@/lib/types";
import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

export const ViolationsTab = () => {
  const { user } = useAuth();
  const {
    data: violationRecords, // Default empty array if undefined
    isPending,
    refetch,
    isRefetching
  } = useViolationRecords({
    userId: user?.id
  });

  useEffect(() => {
    console.log(violationRecords);
  }, [violationRecords]);

  const renderItem = ({ item }: { item: ViolationRecord }) => <ViolationCard record={item} />;

  const onRefresh = () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      {isPending ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Loading...</Text>
        </View>
      ) : violationRecords && violationRecords.length > 0 ? (
        <FlatList
          data={violationRecords}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={onRefresh}
              colors={["#9Bd35A", "#689F38"]}
              tintColor="#689F38"
            />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Feather name="alert-triangle" size={35} color="#000000" />
          <Text style={styles.emptyText}>No violations recorded</Text>
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
  },
  emptyText: {
    color: "#000000",
    marginTop: 10,
    fontSize: 16
  }
});
