import { Stack } from "expo-router";

const RegisterLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RegisterLayout;