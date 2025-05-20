import { StyleSheet, Text, View } from "react-native";

export const CardDataRow = ({ title, value }: { title: string; value: string | number }) => {
  const MAX_LENGTH = 20;
  const stringValue = String(value);
  const truncatedValue =
    stringValue.length > MAX_LENGTH ? `${stringValue.substring(0, MAX_LENGTH)}...` : stringValue;

  return (
    <View style={styles.containerInfoBody}>
      <View style={styles.containerInfoContent}>
        <Text style={styles.infoBody}>{title}</Text>
      </View>
      <View style={styles.containerInfoContent}>
        <Text style={styles.titleBody}>{truncatedValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerInfoContent: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  containerInfoBody: {
    width: "100%",
    minHeight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5
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
  }
});
