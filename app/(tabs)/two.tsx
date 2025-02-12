import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from '@/components/Themed';

export default function TabTwoScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/"); // Redirect to index when this tab loads
  }, []);

  return <View />; // Empty view since user gets redirected immediately
}
