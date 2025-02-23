import { Text, View } from "@/components/Themed";
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

export default function VehicleInformation() {
  const [active, setActive] = useState(true);
  const [violations, setViolations] = useState<
    { id: number; type: string; date: string; status: string }[]
  >([]);

  const [vehicle, setVehicle] = useState({
    name: "",
    licensePlate: "",
    stickerNo: "",
    type: "",
    dateRegistered: ""
  });

  const generateRandomVehicle = () => {
    setVehicle({
      name: faker.person.fullName(),
      licensePlate: `${faker.string.alphanumeric(3).toUpperCase()} ${faker.string.numeric(3)}`,
      stickerNo: faker.string.numeric(10),
      type: faker.helpers.arrayElement(["Student", "Admin", "Staff", "Security"]),
      dateRegistered: `${faker.string.numeric(2)}/${faker.string.numeric(2)}/${faker.string.numeric(4)}`
    });
    clearViolation();
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    generateRandomVehicle();
  }, []);

  const addViolation = () => {
    setViolations([
      ...violations,
      {
        id: violations.length + 1,
        type: "Unauthorized Parking",
        date: `${faker.string.numeric(2)}/${faker.string.numeric(2)}/${faker.string.numeric(4)}`,
        status: "pending"
      }
    ]);
  };

  const resolveViolation = () => {
    setViolations((prevViolations) => {
      const updatedViolations = [...prevViolations];
      const index = updatedViolations.findIndex((v) => v.status === "pending");

      if (index !== -1) {
        updatedViolations[index] = { ...updatedViolations[index], status: "resolved" };
      }

      return updatedViolations;
    });
  };

  const clearViolation = () => {
    setViolations([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <View style={styles.container}>
        {/* Vehicle details */}
        <View style={styles.containerInfo}>
          {/* Vehicle details header */}
          <View style={styles.containerInfoHeader}>
            <View style={styles.containerInfoContent}>
              <Image source={require("../../assets/images/car-icon.png")} />
              <Text style={styles.title}>Vehicle Details</Text>
            </View>
            <View style={styles.containerInfoContent}>
              <Text style={[active ? styles.textActive : styles.textInactive]}>
                {active ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>
          {/* Vehicle details body */}
          <View style={styles.containerInfoBody}>
            <View style={styles.containerInfoContent}>
              <Text style={styles.titleBody}>License Plate</Text>
            </View>
            <View style={styles.containerInfoContent}>
              <Text style={styles.infoBody}>{vehicle.licensePlate}</Text>
            </View>
          </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.containerInfoBody}>
            <View style={styles.containerInfoContent}>
              <Text style={styles.titleBody}>Sticker No.</Text>
            </View>
            <View style={styles.containerInfoContent}>
              <Text style={styles.infoBody}>{vehicle.stickerNo}</Text>
            </View>
          </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.containerInfoBody}>
            <View style={styles.containerInfoContent}>
              <Text style={styles.titleBody}>Registered On</Text>
            </View>
            <View style={styles.containerInfoContent}>
              <Text style={styles.infoBody}>{vehicle.dateRegistered}</Text>
            </View>
          </View>
        </View>
        {/* Owner details */}
        <View style={styles.containerInfo}>
          {/* Vehicle details header */}
          <View style={styles.containerInfoHeader}>
            <View style={styles.containerInfoContent}>
              <Image source={require("../../assets/images/user-icon.png")} />
              <Text style={styles.title}>Owner Details</Text>
            </View>
          </View>
          {/* Owner details body */}
          <View style={styles.containerInfoBody}>
            <View style={styles.containerInfoContent}>
              <Text style={styles.titleBody}>Name</Text>
            </View>
            <View style={styles.containerInfoContent}>
              <Text style={styles.infoBody}>{vehicle.name}</Text>
            </View>
          </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.containerInfoBody}>
            <View style={styles.containerInfoContent}>
              <Text style={styles.titleBody}>Type</Text>
            </View>
            <View style={styles.containerInfoContent}>
              <Text style={styles.infoBody}>{vehicle.type}</Text>
            </View>
          </View>
        </View>
        {/* Violation details */}
        <View style={styles.containerInfo}>
          {/* Violation details header */}
          <View style={styles.containerInfoHeader}>
            <View style={styles.containerInfoContent}>
              <Image source={require("../../assets/images/violation-icon.png")} />
              <Text style={styles.title}>Violation Details</Text>
            </View>
          </View>
          {/* Violation details body */}
          {violations.length === 0 ? (
            <>
              <View style={styles.containerInfoBody}>
                <View style={styles.containerInfoContent}>
                  <Text style={styles.titleBody}>No violations found</Text>
                </View>
              </View>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
              <View style={styles.marginBlock} />
            </>
          ) : (
            violations
              .slice()
              .reverse()
              .map((violation) => (
                <React.Fragment key={violation.id}>
                  <View style={styles.containerInfoBody}>
                    <View>
                      <Text style={styles.titleBody}>{violation.type}</Text>
                      <Text style={styles.textDate}>{violation.date}</Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          violation.status === "pending" ? styles.textPending : styles.textResolved
                        ]}
                      >
                        {violation.status}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                  />
                </React.Fragment>
              ))
          )}
        </View>
        {/* For testing, can remove if no longer needed */}
        <View style={styles.paddingBottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActive(!active)} // test active and inactive colors
          >
            <Text>setActive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={addViolation} // test violations
          >
            <Text>addViolation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={clearViolation} // test violations
          >
            <Text>clearViolation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={resolveViolation} // test violations
          >
            <Text>resolveViolation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={generateRandomVehicle} // generate random info
          >
            <Text>randomInfo</Text>
          </TouchableOpacity>
        </View>
        {/* */}
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
  },
  containerInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    margin: "2%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: "2%",
    paddingVertical: "1%"
  },
  containerInfoHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    backgroundColor: "#EBEAF0",
    margin: "2%",
    padding: "3%",
    borderRadius: 10
  },
  containerInfoContent: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  containerInfoBody: {
    flex: 1,
    width: "95%",
    margin: "2%",
    padding: "3%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  paddingBottom: {
    flexDirection: "row"
  },
  title: {
    fontSize: 20,
    fontFamily: "ROBOTO",
    fontWeight: "400",
    marginHorizontal: 8
  },
  titleBody: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "400"
  },
  infoBody: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold"
  },
  textActive: {
    backgroundColor: "#03CD09",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  textInactive: {
    backgroundColor: "#FB2727",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  textPending: {
    backgroundColor: "#D99C0B",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  textResolved: {
    backgroundColor: "#03CD09",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  textDate: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.5,
    color: "#757575"
  },
  separator: {
    height: 2,
    width: "85%"
  },
  marginBlock: {
    margin: 20
  },
  //for testing can remove if no longer needed
  button: {
    backgroundColor: "blue",
    width: 70,
    height: 15,
    marginHorizontal: 2
  }
});
