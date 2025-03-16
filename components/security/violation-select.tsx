import api from "@/api/axios";
import type { Violation } from "@/lib/types";
import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const ViolationSelect = ({ setViolation }: { setViolation: Dispatch<SetStateAction<string>> }) => {
  const [loading, setLoading] = useState(false);
  const [violationList, setViolationList] = useState<Violation[]>([]);

  const fetchViolationList = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get("/violation");
      if (response.status !== 200 || !response.data) {
        return;
      }

      setViolationList(response.data as Violation[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchViolationList();
  }, [fetchViolationList]);

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
