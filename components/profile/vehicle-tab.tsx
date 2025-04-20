import { VehicleDetails } from "@/components/vehicle/vehicle-details";
import { VehicleOwner } from "@/components/vehicle/vehicle-owner";
import { useAuth } from "@/context/authContext";
import { useVehicles } from "@/hooks/vehicle/useVehicles";
import type { GetVehicleResponse, Vehicle } from "@/lib/types";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export const VehicleTab = () => {
  const { user } = useAuth();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const { data: searchVehicleResult, refetch } = useVehicles({
    ownerId: user?.id,
    page: 1,
    count: 50
  });

  useEffect(() => {
    if ((searchVehicleResult as GetVehicleResponse)?.vehicles) {
      setVehicles(searchVehicleResult.vehicles);
    }
  }, [searchVehicleResult]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }: { item: Vehicle }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedVehicle(item);
        setVisible(true);
      }}
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {item.make} {item.series}
            </Text>
            <Text style={styles.details}>
              Model: {item.model} • Type: {item.type} • Plate: {item.licensePlate}
            </Text>
          </View>

          {item.status === "Approved" && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        {vehicles.length > 0 ? (
          <FlatList
            data={vehicles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={["#0066cc"]}
                tintColor="#0066cc"
              />
            }
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <FontAwesome5 name="car-side" size={35} color="black" style={{ opacity: 0.5 }} />
            <Text style={styles.emptyText}>No vehicles registered yet</Text>
          </View>
        )}
      </View>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="fade"
      >
        <View style={styles.vehicleContainer}>
          <View style={styles.vehicleContainerButton}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <VehicleDetails vehicle={selectedVehicle!} />
          <VehicleOwner owner={user!} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#eee"
  },
  listContent: {
    gap: 12,
    paddingBottom: 20
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 16
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "white",
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginBottom: 4
  },
  details: {
    fontSize: 13,
    color: "black",
    marginBottom: 2
  },
  badge: {
    backgroundColor: "#00C853",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start"
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500"
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64
  },
  emptyText: {
    marginTop: 8,
    color: "black",
    fontSize: 16
  },
  vehicleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#EBEAF0",
    padding: "3%"
  },
  vehicleContainerButton: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 8
  }
});
