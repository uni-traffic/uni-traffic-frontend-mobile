import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

const local_data = [
  {
    value: '1',
    lable: 'Illegal Parking',
  },
  {
    value: '2',
    lable: 'Counter Flow',
  },
  {
    value: '3',
    lable: 'Overloading ',
  },
  {
    value: '4',
    lable: 'parking at the reserved areas',
  },
  {
    value: '5',
    lable: 'driving without VVP or VPS',
  },
];

const SelectViolationScreen = (_props: any) => {
  const [violation, setViolation] = useState('1');

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      data={local_data}
      valueField="value"
      labelField="lable"
      imageField="image"
      placeholder="Select Violation"
      onChange={e => {
        setViolation(e.value);
      }}
    />
  );
};

export default SelectViolationScreen;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: "100%",
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});