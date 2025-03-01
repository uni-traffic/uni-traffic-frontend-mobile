import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Image } from "react-native";
import ViolationModal from "./violation-details";

interface Violation {
  id: string;
  type: string;
  date: string;
  fine: string;
  status: string;
}

const violations: Violation[] = [
  { id: "1", type: "Illegal Parking", date: "2025-05-01", fine: "₱ 3,000", status: "Paid" },
  { id: "2", type: "Reckless Driving", date: "2025-06-10", fine: "₱ 5,000", status: "Unpaid" },
  { id: "3", type: "Overspeeding", date: "2025-07-15", fine: "₱ 2,500", status: "Unpaid" }
];

export const UserDashboard = () => {
  const [isVisible, setIsModalVisible] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);;

  const violations: Violation[] = [
    { id: "1", type: "Illegal Parking", date: "2025-05-01", fine: "₱ 3,000", status: "Paid" },
    { id: "2", type: "Reckless Driving", date: "2025-06-10", fine: "₱ 5,000", status: "Unpaid" },
    { id: "3", type: "Overspeeding", date: "2025-07-15", fine: "₱ 2,500", status: "Unpaid" }
  ];

  const openModal = (violation: Violation) => {
    setSelectedViolation(violation);
    setIsModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require("../../assets/images/neu-logo.png")} />
          <Text style={styles.headerText}>UNITRAFFIC</Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.box}>
          <FontAwesome6 style={styles.icon} name="peso-sign" size={24} color="black" />
          <View>
            <Text style={styles.label}>Total Fine</Text>
            <Text style={styles.text}>4,000</Text>
          </View>
        </View>

        <View style={styles.box}>
          <AntDesign style={styles.icon} name="exclamationcircleo" size={24} color="black" />
          <View>
            <Text style={styles.label}>Violations</Text>
            <Text style={styles.text}>{violations.length}</Text>
          </View>
        </View>
      </View>

      <View style={styles.violationContainer}>
        <View style={styles.violationBox}>
          <FlatList
            data={violations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openModal(item)}>
                <View style={styles.violationIcon}>
                  <AntDesign style={styles.icon} name="exclamationcircleo" size={24} color="red" />
                  <View style={styles.violationInfo}>
                    <Text style={styles.violation}>{item.type}</Text>
                    <Text style={styles.label}>{item.date}</Text>
                  </View>
                  <View>
                    <Text style={styles.fine}>{item.fine}</Text>
                    <Text style={item.status === "Paid" ? styles.textPaid : styles.textUnpaid}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsModalVisible(false)}
            animationType="fade"
          >
            <ViolationModal visible={isVisible} closeModal={() => setIsModalVisible(false)} violation={selectedViolation} />
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    width: "100%"
  },
  bodyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    padding: 10
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
    marginTop: 10,
    marginBottom: 20,
    minHeight: 60
  },
  violationInfo: {
    flex: 1,
    alignContent: "center"
  },
  violation: {
    fontSize: 16,
    fontWeight: "bold"
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
    padding: 10
  },
  box: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
    width: 180,
    height: 80,
    borderRadius: 10,
    margin: 5
  },
  fine: {
    fontSize: 15,
    fontWeight: "bold"
  },
  text: {
    fontSize: 18
  },
  label: {
    fontSize: 10,
    fontWeight: "medium"
  },
  header: {
    backgroundColor: "black",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  titleContainer: {
    flexDirection: "row",
    alignSelf: "center",
    borderColor: "white"
  },
  icon: {
    marginRight: 15,
    marginLeft: 20
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
    fontSize: 12,
  },
  textUnpaid: {
    backgroundColor: "#FB2727",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  logo: {
    height: 60,
    width: 60,
    marginRight: 20,
    alignSelf: "center"
  }
});
