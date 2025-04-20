import api from "@/api/axios";
import { useAuth } from "@/context/authContext";
import type { ViolationRecord } from "@/lib/types";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import type { AxiosError } from "axios";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ViolationModal from "./violation-details";

export const UserDashboard = () => {
  const { user } = useAuth();
  const [isVisible, setIsModalVisible] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<ViolationRecord | null>(null);
  const [violationRecords, setViolationRecords] = useState<ViolationRecord[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchUserViolationRecords = useCallback(async () => {
    try {
      const response = await api.get("/violation-record/search", {
        params: {
          userId: user?.id
        }
      });
      if (response.status !== 200 || !response.data) {
        return;
      }

      setViolationRecords(response.data as ViolationRecord[]);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUserViolationRecords();
  }, [fetchUserViolationRecords]);

  const openModal = (violation: ViolationRecord) => {
    setSelectedViolation(violation);
    setIsModalVisible(true);
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserViolationRecords().finally(() => setRefreshing(false));
  }, [fetchUserViolationRecords]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require("../../../assets/images/neu-logo.png")} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>UNITRAFFIC</Text>
          </View>
        </View>
        {/*<TouchableOpacity style={styles.button} onPress={() => router.push("/register")}>*/}
        {/*  <AntDesign style={styles.buttonIcon} name="form" size={22} color="black" />*/}
        {/*  <Text style={styles.buttonText}>Apply for Vehicle Sticker</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.box}>
          <View style={styles.card}>
            <FontAwesome6 style={styles.icon} name="peso-sign" size={24} color="black" />
            <View>
              <Text style={styles.label}>Total Fine</Text>
              <Text style={styles.text}>
                {violationRecords
                  ? violationRecords.reduce((prev, next) => prev + next.violation?.penalty!, 0)
                  : "0.00"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <View style={styles.card}>
            <AntDesign style={styles.icon} name="exclamationcircleo" size={24} color="black" />
            <View>
              <Text style={styles.label}>Violations</Text>
              <Text style={styles.text}>{violationRecords.length}</Text>
            </View>
          </View>
        </View>
      </View>

      {violationRecords.length > 0 ? (
        <View style={styles.violationContainer}>
          <View style={styles.violationBox}>
            {violationRecords.map((item) => {
              return (
                <TouchableOpacity onPress={() => openModal(item)} key={item.id}>
                  <View style={styles.violationIcon}>
                    <AntDesign
                      style={styles.icon}
                      name="exclamationcircleo"
                      size={24}
                      color="red"
                    />
                    <View style={styles.violationInfo}>
                      <Text style={styles.violation}>{item.violation!.violationName}</Text>
                      <Text style={styles.label}>
                        {format(new Date(item.date).toString(), "MMMM dd yyyy")}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.fine}>
                        {"₱ "}
                        {item.violation!.penalty}
                      </Text>
                      <Text style={item.status === "PAID" ? styles.textPaid : styles.textUnpaid}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            <Modal
              transparent={true}
              visible={isVisible}
              onRequestClose={() => setIsModalVisible(false)}
              animationType="fade"
            >
              <ViolationModal
                closeModal={() => setIsModalVisible(false)}
                violation={selectedViolation!}
              />
            </Modal>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    width: "100%"
  },
  textContainer: {
    justifyContent: "center"
  },
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  card: {
    alignItems: "center",
    flexDirection: "row"
  },
  violationContainer: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "90%",
    alignSelf: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minHeight: 60,
    marginBottom: 20
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
  violationBox: {
    alignContent: "center",
    justifyContent: "center",
    padding: 10
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
  box: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: 75,
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  fine: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  text: {
    fontSize: 18
  },
  label: {
    fontSize: 10,
    fontWeight: "medium",
    marginTop: 3
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
  icon: {
    marginRight: 15
  },
  headerText: {
    color: "white",
    fontSize: 40,
    alignSelf: "flex-start"
  },
  textPaid: {
    backgroundColor: "#03CD09",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  textUnpaid: {
    backgroundColor: "#FB2727",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  logo: {
    height: 60,
    width: 60,
    marginRight: 20,
    alignSelf: "center"
  },
  buttonText: {
    color: "black",
    fontSize: 16
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
  }
});
