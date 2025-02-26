import { Stack } from "expo-router";

const VehicleLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default VehicleLayout;
