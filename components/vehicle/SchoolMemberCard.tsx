import { CardDataRow } from "@/components/common/CardDataRow";
import { NeuImage } from "@/components/common/NeuImage";
import type { SchoolMember } from "@/lib/types";
import { Octicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export const SchoolMemberCard = ({ schoolMember }: { schoolMember: SchoolMember }) => {
  return (
    <View style={styles.containerInfo}>
      {/* Vehicle details header */}
      <View style={styles.containerInfoHeader}>
        <View style={styles.containerInfoContent}>
          <Octicons name="person" size={24} color="black" />
          <Text style={styles.title}>Staff/Student Details</Text>
        </View>
      </View>

      {/* Owner details body */}
      <CardDataRow title={"Name"} value={`${schoolMember.firstName} ${schoolMember.lastName}`} />
      <CardDataRow title={"School ID"} value={schoolMember.schoolId} />
      <CardDataRow title={"Type"} value={schoolMember.type} />
      <View
        style={{
          width: "100%",
          paddingHorizontal: 10,
          paddingTop: 5
        }}
      >
        <Text style={styles.infoBody}>Documents</Text>
        <View
          style={{
            height: 150,
            width: "100%",
            flexDirection: "row",
            marginTop: 5,
            paddingBottom: 5
          }}
        >
          <View style={{ flex: 1, marginRight: 2 }}>
            <NeuImage image={schoolMember.schoolCredential} cover={true} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInfo: {
    alignItems: "center",
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
    width: "100%",
    backgroundColor: "#EBEAF0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2
  },
  containerInfoContent: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontFamily: "ROBOTO",
    fontWeight: "400",
    marginHorizontal: 8
  },
  infoBody: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold"
  }
});
