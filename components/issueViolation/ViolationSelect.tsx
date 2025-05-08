import { useViolations } from "@/hooks/violation/useViolations";
import type { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const ViolationSelect = ({ setViolation }: { setViolation: Dispatch<SetStateAction<string>> }) => {
  const { data: violationsData } = useViolations({
    isDeleted: false,
    count: 100,
    page: 1
  });

  const violationList = violationsData?.violation ?? [];

  return (
    <Dropdown
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      iconStyle={styles.iconStyle}
      maxHeight={400}
      data={violationList}
      valueField="id"
      labelField="violationName"
      search
      placeholder="Select Violation"
      onChange={(e) => {
        setViolation(e.id);
      }}
    />
  );
};

export default ViolationSelect;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8
  },
  iconStyle: {
    width: 20,
    height: 20
  }
});
