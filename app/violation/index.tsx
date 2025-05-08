import ViolationSelect from "@/components/issueViolation/ViolationSelect";
import { useAuth } from "@/context/AuthContext";
import { useCreateViolationRecord } from "@/hooks/violationRecord/useCreateViolationRecord";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation, useRouter } from "expo-router";
import { useGlobalSearchParams } from "expo-router/build/hooks";
import { defaultTo } from "rambda";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { StyleSheet } from "react-native";

export default function Violation() {
  const queryClient = useQueryClient();
  const queryParams = useGlobalSearchParams();
  const [licensePlate, setLicensePlate] = useState<string>(
    defaultTo("", queryParams.licensePlate as string)
  );
  const [stickerNumber, setStickerNumber] = useState(
    defaultTo("", queryParams.stickerNumber as string)
  );
  const [violation, setViolation] = useState("");
  const [remarks, setRemarks] = useState("");

  const { mutate: submitViolationRecord, isPending: loading } = useCreateViolationRecord();

  const { user } = useAuth();
  const navigation = useNavigation();

  const router = useRouter();
  if (user?.role !== "SECURITY") {
    router.replace("/(user)");
  }

  const handleSubmit = async () => {
    if (!stickerNumber && !licensePlate) {
      alert("License Plate or Sticker Number must be provided.");
      return;
    }

    if (!violation) {
      alert("You must select a violation.");
      return;
    }

    if (remarks.trim().length > 140) {
      alert("Remarks is limited to 140 characters long");
      return;
    }

    submitViolationRecord(
      {
        vehicleId: queryParams.vehicleId as string | undefined,
        licensePlate: licensePlate ? licensePlate.replace(" ", "") : undefined,
        stickerNumber: stickerNumber,
        violationId: violation,
        remarks: remarks
      },
      {
        onSuccess: () => {
          alert("Violation Submitted");
          queryClient.invalidateQueries({ queryKey: ["violationRecords"] });
          router.back();
        },
        onError: (error) => {
          alert(`Error occurred submitting violation: \n${error.message}`);
        }
      }
    );
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={require("../../assets/images/neu-logo.png")} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Report Violation</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionContainer}>
          <View style={styles.container}>
            <Text style={styles.label}>License Plate</Text>
            <View style={styles.box}>
              <TextInput
                style={styles.input}
                placeholder="ABC 1234"
                value={licensePlate}
                onChangeText={setLicensePlate}
              />
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Sticker Number</Text>
            <View style={styles.box}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="2020XXXX"
                value={stickerNumber}
                maxLength={9}
                onChangeText={setStickerNumber}
              />
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Violation Type</Text>
            <View style={styles.box}>
              <ViolationSelect setViolation={setViolation} />
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Remarks (Optional)</Text>
            <View style={styles.box}>
              <TextInput
                style={[styles.input, styles.multilineText]}
                placeholder="Type here.."
                multiline={true}
                maxLength={140}
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType="done"
                onChangeText={setRemarks}
              />
            </View>
          </View>
        </View>
        <View style={styles.interactionButton}>
          <TouchableOpacity style={styles.button} onPress={handleCancel} disabled={loading}>
            <Text style={styles.btnLabel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, loading && styles.loading]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size={"small"} color="white" />
            ) : (
              <Text style={styles.btnLabel}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#EBEAF0",
    width: "100%"
  },
  loading: {
    backgroundColor: "#71797E",
    borderColor: "#71797E"
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  textContainer: {
    height: "100%",
    justifyContent: "center",
    marginLeft: 12
  },
  section: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    justifyContent: "space-between"
  },
  sectionContainer: {
    justifyContent: "space-between"
  },
  interactionButton: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    paddingBottom: 5
  },
  button: {
    height: 45,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#20201F",
    margin: 4,
    marginTop: 10,
    borderRadius: 8
  },
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
    paddingLeft: 10
  },
  btnLabel: {
    color: "white"
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: 10
  },
  multilineText: {
    minHeight: 100,
    textAlignVertical: "top"
  },
  logo: {
    height: 60,
    width: 60,
    marginLeft: 12
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: 100,
    backgroundColor: "black",
    paddingLeft: 15,
    paddingHorizontal: 5
  }
});
