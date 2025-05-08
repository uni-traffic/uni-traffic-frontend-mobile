import { VehicleStickerApplicationModal } from "@/components/common/ApplicationModal";
import { VehicleApplicationCard } from "@/components/common/VehicleApplicationCard";
import { useAuth } from "@/context/AuthContext";
import { useVehicleApplications } from "@/hooks/vehicleApplication/useVehicleApplications";
import type { VehicleApplication } from "@/lib/types";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function Application() {
  const { user } = useAuth();
  const [isVisible, setIsModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<VehicleApplication | null>(null);

  const {
    data: vehicleApplicationsData,
    refetch: vehicleApplicationRefetch,
    isRefetching: refreshing,
    isLoading: loading
  } = useVehicleApplications({
    count: 10,
    page: 1,
    applicantId: user?.id
  });

  const vehicleApplications = vehicleApplicationsData?.vehicleApplication ?? [];

  const openModal = (application: VehicleApplication) => {
    setSelectedApplication(application);
    setIsModalVisible(true);
  };

  const handleRefresh = useCallback(async () => {
    await vehicleApplicationRefetch();
  }, [vehicleApplicationRefetch]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require("../../assets/images/neu-logo.png")} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>UNITRAFFIC</Text>
          </View>
        </View>
      </View>
      {vehicleApplications.length > 0 ? (
        <View style={styles.violationContainer}>
          {vehicleApplications.map((item) => (
            <VehicleApplicationCard
              key={item.id}
              vehicleApplication={item}
              onPress={() => openModal(item)}
            />
          ))}
          <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsModalVisible(false)}
            animationType="fade"
          >
            <VehicleStickerApplicationModal
              closeModal={() => setIsModalVisible(false)}
              vehicleApplication={selectedApplication!}
            />
          </Modal>
        </View>
      ) : !loading ? (
        <View style={styles.violationContainer}>
          <View style={styles.notFound}>
            <Text>No Vehicle Sticker Application Found</Text>
          </View>
        </View>
      ) : (
        <View style={styles.violationContainer}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={"large"} color="black" />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEAF0",
    width: "100%"
  },
  notFound: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderColor: "#ccc",
    width: "90%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  header: {
    backgroundColor: "black",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  titleContainer: {
    flexDirection: "row",
    alignSelf: "center"
  },
  headerText: {
    color: "white",
    fontSize: 40,
    alignSelf: "flex-start"
  },
  violationBox: {
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderColor: "#ccc",
    width: "90%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  violationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  violationIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBEAF0",
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  violationInfo: {
    flex: 1,
    alignContent: "center"
  },
  violation: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    paddingRight: 5
  },
  icon: {
    marginRight: 15
  },
  label: {
    fontSize: 10,
    fontWeight: "medium",
    marginTop: 3
  },
  fine: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  logo: {
    height: 60,
    width: 60,
    marginRight: 20,
    alignSelf: "center"
  },
  textContainer: {
    justifyContent: "center"
  },
  loadingContainer: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderColor: "#ccc",
    width: "90%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1
  }
});
