import { Stack } from "expo-router";

const ApplicationLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ApplicationLayout;
