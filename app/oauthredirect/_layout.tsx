import { Stack } from "expo-router";

const OAuthRedirectLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};
export default OAuthRedirectLayout;
