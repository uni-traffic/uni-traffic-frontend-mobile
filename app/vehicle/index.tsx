import { Loading } from "@/components/Loading";
import { OwnerCard } from "@/components/vehicle/OwnerCard";
import { VehicleCard } from "@/components/vehicle/VehicleCard";
import { VehicleNotFound } from "@/components/vehicle/VehicleNotFound";
import { ViolationsCard } from "@/components/vehicle/ViolationsCard";
import { useAuth } from "@/context/AuthContext";
import { useVehicles } from "@/hooks/vehicle/useVehicles";
import { useViolationRecords } from "@/hooks/violationRecord/useViolationRecords";
import type { Vehicle, ViolationRecord } from "@/lib/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function VehiclePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { id, licensePlate, stickerNumber, ownerId } = useGlobalSearchParams();

  const {
    data: vehicleFetchResponse,
    refetch: vehicleRefetch,
    isLoading: isVehicleFetching,
    isRefetching: isVehicleRefetching
  } = useVehicles({
    id: id as string | undefined,
    ownerId: ownerId as string | undefined,
    page: 1,
    count: 1
  });

  const {
    data: violationResponse,
    refetch: refetchViolations,
    isLoading: isViolationsFetching,
    isRefetching: isViolationRefetching
  } = useViolationRecords({
    vehicleId: id as string | undefined,
    userId: ownerId as string | undefined,
    count: 50,
    page: 1
  });

  const vehicle: Vehicle | undefined = vehicleFetchResponse?.vehicles[0] ?? undefined;
  const violationHistory: ViolationRecord[] = violationResponse?.violation ?? [];
  const isLoading = isVehicleFetching || isViolationsFetching;
  const isRefetching = isVehicleRefetching || isViolationRefetching;

  if (!id && !licensePlate && !stickerNumber) {
    return <VehicleNotFound />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!vehicle) {
    return <VehicleNotFound />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => {
            vehicleRefetch();
            refetchViolations();
          }}
        />
      }
    >
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Image style={styles.logo} source={require("../../assets/images/neu-logo.png")} />
        </View>
        {user?.role === "SECURITY" ? (
          <View style={styles.textContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push(
                  `/violation?licensePlate=${vehicle!.licensePlate}&stickerNumber=${vehicle!.stickerNumber}`
                )
              }
            >
              <FontAwesome name="file-text-o" size={16} color="black" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>New Violation</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <View style={styles.container}>
        <VehicleCard vehicle={vehicle} />
        <OwnerCard owner={vehicle.owner!} />
        <ViolationsCard violations={violationHistory} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#EBEAF0"
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#EBEAF0"
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "flex-end",
    marginTop: 10
  },
  buttonIcon: {
    marginRight: 5,
    paddingLeft: 4
  },
  buttonText: {
    color: "black",
    fontSize: 16
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBEAF0",
    padding: "3%"
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  logo: {
    height: 60,
    width: 60
  },
  textContainer: {
    height: "100%",
    justifyContent: "center"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    height: 100,
    width: "100%",
    backgroundColor: "black"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  }
});
