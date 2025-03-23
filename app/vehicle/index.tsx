import api from "@/api/axios";
import { Loading } from "@/components/loading";
import { VehicleDetails } from "@/components/vehicle/vehicle-details";
import { VehicleNotFound } from "@/components/vehicle/vehicle-not-found";
import { VehicleOwner } from "@/components/vehicle/vehicle-owner";
import { Violation } from "@/components/vehicle/violation";
import type { Vehicle, ViolationRecord } from "@/lib/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function VehicleInformation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | undefined>();
  const [violationHistory, setViolationHistory] = useState<ViolationRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false); // Add state for refresh

  const queryParams = useGlobalSearchParams();

  const getVehicle = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get("/vehicle", {
        params: {
          id: queryParams.id,
          licensePlate: queryParams.licensePlate,
          stickerNumber: queryParams.stickerNumber
        }
      });
      if (response.status !== 200) {
        console.error("Unknown response");
        return;
      }

      setVehicle(response.data as Vehicle);
    } catch {
      setVehicle(undefined);
    } finally {
      setLoading(false);
    }
  }, [queryParams.id, queryParams.licensePlate, queryParams.stickerNumber]);

  const fetchVehicleViolation = useCallback(async () => {
    if (!vehicle?.licensePlate) {
      return;
    }

    try {
      const response = await api.get("/violation-record/search", {
        params: {
          vehicleId: vehicle?.id
        }
      });
      if (response.status !== 200 || response.data.length === 0) {
        console.error("Unknown response");
        return;
      }

      setViolationHistory(response.data as ViolationRecord[]);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
    }
  }, [vehicle?.id, vehicle?.licensePlate]);

  useEffect(() => {
    getVehicle();
  }, [getVehicle]);

  useEffect(() => {
    if (vehicle) {
      fetchVehicleViolation();
    }
  }, [vehicle, fetchVehicleViolation]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getVehicle();
    fetchVehicleViolation().finally(() => setRefreshing(false));
  }, [fetchVehicleViolation, getVehicle]);

  if (!queryParams.id && !queryParams.licensePlate && !queryParams.stickerNumber) {
    return <VehicleNotFound />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!vehicle) {
    return <VehicleNotFound />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.scrollView}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Image style={styles.logo} source={require("../../assets/images/neu-logo.png")} />
        </View>
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
      </View>
      <View style={styles.container}>
        <VehicleDetails vehicle={vehicle} />
        <VehicleOwner owner={vehicle.owner!} />
        <Violation violations={violationHistory} />
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
    // marginLeft: 12
  },
  textContainer: {
    height: "100%",
    // marginLeft: 12,
    justifyContent: "center"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
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
