import type { Violation } from "@/lib/types";
import type { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data: Violation[] = [
  {
    id: "1",
    category: "A",
    violationName: "Illegal Parking",
    penalty: 500
  },
  {
    id: "2",
    category: "A",
    violationName: "Counter Flow",
    penalty: 500
  },
  {
    id: "3",
    category: "A",
    violationName: "Overloading",
    penalty: 500
  },
  {
    id: "4",
    category: "A",
    violationName: "parking at the reserved areas",
    penalty: 500
  },
  {
    id: "5",
    category: "A",
    violationName: "driving without VVP or VPS",
    penalty: 500
  }
];

const ViolationSelect = ({ setViolation }: { setViolation: Dispatch<SetStateAction<string>> }) => {
  return (
    <Dropdown
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      iconStyle={styles.iconStyle}
      maxHeight={400}
      data={data}
      valueField="id"
      labelField="violationName"
      search
      placeholder="Select Violation"
      onChange={(e) => {
        setViolation(e.value);
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
