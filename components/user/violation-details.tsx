import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const ViolationModal = ({ visible, closeModal, violation}: any) => {
    

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <Text style={styles.h1}>Violation</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Vehicle License Plate</Text>
          <View style={styles.box}>
            <Text style={styles.displayText}>ABC 123</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Violation Type</Text>
          <View style={styles.box}>
            <Text style={styles.displayText}>{violation.type}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Fine amount (₱)</Text>
          <View style={styles.box}>
            <Text style={styles.displayText}>{violation.fine}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Remarks</Text>
          <View style={[styles.box, styles.textArea]}>
            <Text style={styles.displayText}>parking in inappropriate location </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => closeModal()}>
        <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
     </View>
  );
};

export default ViolationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContainer: {
    alignItems: "center",
    width: "90%",
    height: "60%",
    backgroundColor: "#EBEAF0",
    borderRadius: 10
  },
  section: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  box: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f5f5f5",
    width: "100%"
  },
  h1: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start"
  },
  displayText: {
    fontSize: 14,
    color: "#000",
  },
  textArea: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  button: {
    height: 30,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20201F",
    margin: 10,
    borderRadius: 8
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
