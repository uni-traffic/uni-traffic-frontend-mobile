import { Stack } from "expo-router";

const ViolationLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ViolationLayout;
