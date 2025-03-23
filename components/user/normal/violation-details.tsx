import type { ViolationRecord } from "@/lib/types";
import { format } from "date-fns";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ViolationModalProps {
  violation: ViolationRecord;
  closeModal: () => void;
}

const ViolationModal = ({ closeModal, violation }: ViolationModalProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.h1}>Violation</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={violation.status === "PAID" ? styles.textPaid : styles.textUnpaid}>
              {violation.status}
            </Text>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.violationDetails}>
            <View style={styles.section}>
              <Text style={styles.label}>Reference ID:</Text>
              <View style={styles.box}>
                <Text style={styles.displayText}>{violation.id}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Vehicle License Plate</Text>
              <View style={styles.box}>
                <Text style={styles.displayText}>{violation.vehicle?.licensePlate}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Sticker Number</Text>
              <View style={styles.box}>
                <Text style={styles.displayText}>{violation.vehicle?.stickerNumber}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Date</Text>
              <View style={styles.box}>
                <Text style={styles.displayText}>
                  {format(new Date().toString(), "MMMM dd yyyy")}
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Violation</Text>
              <View style={styles.box}>
                <Text style={styles.displayText}>{violation.violation?.violationName}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Fine amount (₱)</Text>
              <View style={styles.box}>
                <Text style={styles.displayText}>₱ {violation.violation?.penalty}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Remarks</Text>
              <View style={[styles.box, styles.textArea]}>
                <Text style={styles.displayText}>{violation.remarks}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => closeModal()}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  violationDetails: {
    alignItems: "center"
  },
  bodyContainer: {
    width: "100%",
    justifyContent: "space-between"
  },
  header: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center"
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#EBEAF0",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  section: {
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  box: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f5f5f5",
    width: "100%"
  },
  textPaid: {
    backgroundColor: "#03CD09",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 10
  },
  textUnpaid: {
    backgroundColor: "#FB2727",
    fontFamily: "ROBOTO-MEDIUM",
    color: "white",
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 5
  },
  textContainer: {
    // height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  h1: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 3
  },
  displayText: {
    fontSize: 14,
    color: "#000"
  },
  textArea: {
    minHeight: 80,
    maxHeight: 80,
    textAlignVertical: "top"
  },
  button: {
    height: 30,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20201F",
    borderRadius: 12
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
