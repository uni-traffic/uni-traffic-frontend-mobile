import { StyleSheet } from 'react-native';
import {  View } from '@/components/Themed';
import SecurityDashboard from '@/components/security/dashboard';
import { useAuth } from '@/context/authContext';
import { AdminDashboard } from '@/components/admin/dashboard';
import { UserDashboard } from '@/components/user/dashboard';

export default function Dashboard () {
  const { user } = useAuth();
    
  return (
    <View style={styles.container}>
    {user?.role === "SECURITY" && <SecurityDashboard/> }
    {user?.role === "ADMIN" && <AdminDashboard/>}
    {(user?.role === "STUDENT" || user?.role === "STAFF") && <UserDashboard/> }
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});