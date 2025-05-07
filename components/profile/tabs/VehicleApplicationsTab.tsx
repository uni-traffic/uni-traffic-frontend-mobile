import { VehicleStickerApplicationModal } from "@/components/common/ApplicationModal";
import { VehicleApplicationCard } from "@/components/common/VehicleApplicationCard";
import { useAuth } from "@/context/AuthContext";
import { useVehicleApplications } from "@/hooks/vehicleApplication/useVehicleApplications";
import type { VehicleApplication } from "@/lib/types";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const VehicleApplicationsTab = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<VehicleApplication | null>(null);
  const { data: vehicleApplicationsData, isPending } = useVehicleApplications({
    applicantId: user?.id,
    count: 10,
    page: 1
  });

  const vehicleApplications = vehicleApplicationsData?.vehicleApplication ?? [];

  const openModal = (application: VehicleApplication) => {
    setSelectedApplication(application);
    setModalVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        {!isPending && vehicleApplications && vehicleApplications.length > 0 ? (
          <FlatList
            data={vehicleApplications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }: { item: VehicleApplication }) => (
              <VehicleApplicationCard vehicleApplication={item} onPress={() => openModal(item)} />
            )}
            contentContainerStyle={{ gap: 16 }}
          />
        ) : (
          <View style={styles.emptyState}>
            <AntDesign name="filetext1" size={35} color="#000000" style={{ marginBottom: 15 }} />
            <Text
              style={{
                fontSize: 16
              }}
            >
              No Vehicle Applications Found
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            position: "absolute",
            bottom: 20,
            right: 20
          }}
          onPress={() => router.navigate("/register")}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
      >
        <VehicleStickerApplicationModal
          closeModal={() => setModalVisible(false)}
          vehicleApplication={selectedApplication!}
        />
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
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white"
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
    shadowRadius: 2
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4
  },
  subText: {
    fontSize: 13,
    color: "#000000"
  },
  status: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignSelf: "flex-start",
    fontWeight: "500"
  },
  emptyState: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64
  }
});
