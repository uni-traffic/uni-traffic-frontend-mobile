import api from "@/api/axios";
import { Loading } from "@/components/loading";
import { VehicleDetails } from "@/components/vehicle/vehicle-details";
import { VehicleNotFound } from "@/components/vehicle/vehicle-not-found";
import { VehicleOwner } from "@/components/vehicle/vehicle-owner";
import { Violation } from "@/components/vehicle/violation";
import type { Vehicle } from "@/lib/types";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function VehicleInformation() {
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | undefined>();

  const queryParams = useGlobalSearchParams();
  if (!queryParams.id && !queryParams.licensePlate && !queryParams.stickerNumber) {
    return <VehicleNotFound />;
  }

  const getVehicle = async () => {
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

      const vehicleData: Vehicle = response.data;
      setVehicle(vehicleData);
    } catch {
      setVehicle(undefined);
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getVehicle();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!vehicle) {
    return <VehicleNotFound />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <View style={styles.container}>
        <VehicleDetails vehicle={vehicle} />
        <VehicleOwner owner={vehicle.owner} />
        <Violation />
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBEAF0",
    padding: "3%"
  }
});
