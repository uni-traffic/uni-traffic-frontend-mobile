import { ViolationCard } from "@/components/common/ViolationCard";
import { useAuth } from "@/context/AuthContext";
import { useViolationRecords } from "@/hooks/violationRecord/useViolationRecords";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

export const VerifiedUserDashboard = () => {
  const { user } = useAuth();

  const {
    data: violationRecordData,
    refetch,
    isRefetching: refreshing
  } = useViolationRecords({
    userId: user?.id,
    count: 50,
    page: 1
  });

  const violationRecords = violationRecordData?.violation ?? [];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refetch()} />}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={require("../../assets/images/neu-logo.png")} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>UNITRAFFIC</Text>
          </View>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <View style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>
          <View style={[styles.box]}>
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
          <View>
            {violationRecords.map((item) => {
              return (
                <View key={item.id} style={styles.cardStyle}>
                  <ViolationCard record={item} />
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    width: "100%"
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
  logo: {
    height: 60,
    width: 60,
    marginRight: 20,
    alignSelf: "center"
  },
  textContainer: {
    justifyContent: "center"
  },

  bodyContainer: {
    flexDirection: "column",
    paddingHorizontal: 20
  },
  box: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "49%",
    height: 75,
    borderRadius: 10,
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  card: {
    alignItems: "center",
    flexDirection: "row"
  },
  text: {
    fontSize: 18
  },
  label: {
    fontSize: 10,
    fontWeight: "medium",
    marginTop: 3
  },

  cardStyle: {
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  }
});
