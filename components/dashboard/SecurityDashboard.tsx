import PaginationControls from "@/components/common/PaginationControls";
import { useVehicles } from "@/hooks/vehicle/useVehicles";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const SecurityDashboard = () => {
  const router = useRouter();
  const { search } = useGlobalSearchParams();
  const initialSearch = search === "undefined" || search === undefined ? "" : (search as string);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>(initialSearch);

  const [page, setPage] = useState(1);

  const { data: queryResults, isFetching } = useVehicles({
    page: page,
    count: 7,
    ...(appliedSearchQuery.trim() !== "" && { searchKey: appliedSearchQuery })
  });

  const vehicles = queryResults?.vehicles ?? [];

  const handleSearch = () => {
    router.setParams({ search: searchQuery });
    setAppliedSearchQuery(searchQuery);
    setPage(1);
  };

  useEffect(() => {
    if (search === "") {
      router.setParams({ search: "" });
      setAppliedSearchQuery("");
      setPage(1);
      return;
    }

    setSearchQuery((search as string) ?? "");
    setAppliedSearchQuery((search as string) ?? "");
    setPage(1);
  }, [search, router.setParams]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <FontAwesome
            name="shield"
            size={Platform.select({ ios: 48, android: 48, default: 58 })}
            color="white"
            style={styles.shieldIcon}
          />
          <Text style={styles.headerText}>SECURITY</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View>
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <TextInput
              placeholder="Search License Plate"
              style={styles.searchInput}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              value={searchQuery}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={isFetching}
            >
              <FontAwesome name="search" size={16} color={isFetching ? "gray" : "black"} />
            </TouchableOpacity>
          </View>

          {/* Vehicle List */}
          <View style={styles.vehicleListContainer}>
            {isFetching ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
                <Text style={styles.loadingText}>Loading vehicles...</Text>
              </View>
            ) : vehicles.length > 0 ? (
              <FlatList
                data={vehicles}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent}
                renderItem={({ item }) => (
                  <View style={styles.vehicleItem}>
                    <View style={styles.vehicleIconContainer}>
                      {item.type === "CAR" ? (
                        <FontAwesome name="car" size={18} color="black" />
                      ) : (
                        <Fontisto name="motorcycle" size={18} color="black" />
                      )}
                    </View>

                    <View style={styles.vehicleInfo}>
                      <Text style={styles.licensePlate}>{item.licensePlate}</Text>
                      <Text style={styles.stickerNumber}>{item.stickerNumber}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.detailsButton}
                      activeOpacity={0.7}
                      onPress={() => router.push(`/vehicle?id=${item.id}`)}
                    >
                      <Text style={styles.detailsText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            ) : (
              <View style={styles.emptyState}>
                <FontAwesome name="exclamation-circle" size={32} color="#6b7280" />
                <Text style={styles.emptyStateTitle}>No vehicles found</Text>
                <Text style={styles.emptyStateText}>
                  {appliedSearchQuery
                    ? "No results match your search criteria"
                    : "No vehicles registered yet"}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Pagination Controls - Only show if we have results */}
        {!isFetching && vehicles.length > 0 && (
          <PaginationControls
            currentPage={page}
            totalPages={queryResults?.totalPages || 1}
            prev={() => setPage((prev) => Math.max(prev - 1, 1))}
            next={() => setPage((prev) => prev + 1)}
            setPage={setPage}
            hasPrev={page > 1}
            hasNext={!!queryResults?.hasNextPage}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e7eb"
  },
  header: {
    backgroundColor: "black",
    width: "100%",
    padding: 16
  },
  headerContent: {
    flexDirection: "row",
    paddingHorizontal: 16
  },
  shieldIcon: {
    marginRight: 16
  },
  headerText: {
    color: "white",
    fontSize: 36,
    lineHeight: 40
  },
  mainContent: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    width: "90%",
    maxWidth: 500,
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    marginTop: 16,
    marginBottom: 40,
    paddingVertical: 16
  },
  searchBarContainer: {
    width: "100%",
    flexDirection: "row"
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#9ca3af",
    backgroundColor: "white",
    paddingLeft: 12,
    fontSize: 16
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#9ca3af"
  },
  vehicleListContainer: {
    marginTop: 12,
    minHeight: 200
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32
  },
  loadingIndicator: {
    marginTop: 32
  },
  loadingText: {
    marginTop: 16,
    color: "#4b5563"
  },
  flatListContent: {
    paddingBottom: 8
  },
  vehicleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  vehicleIconContainer: {
    marginRight: 8,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  vehicleInfo: {
    flex: 1
  },
  licensePlate: {
    fontSize: 16,
    fontWeight: "bold"
  },
  stickerNumber: {
    fontSize: 12,
    color: "#6b7280"
  },
  detailsButton: {
    opacity: 1
  },
  detailsText: {
    color: "#2563eb",
    fontSize: 14
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32
  },
  emptyStateTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#4b5563"
  },
  emptyStateText: {
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8
  }
});

export default SecurityDashboard;
