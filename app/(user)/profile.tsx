import { ApplicationsTab } from "@/components/profile/applications-tab";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { VehicleTab } from "@/components/profile/vehicle-tab";
import { ViolationsTab } from "@/components/profile/violations-tab";
import { useAuth } from "@/context/authContext";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";



export default function Profile() {
  const { logout } = useAuth();
  const [vehicleApplications] = useState([
    {
      id: "app-001",
      userId: "user-001",
      vehicle: {
        make: "Toyota",
        series: "Vios",
        model: 2020,
        licensePlate: "ABC-1234",
        type: "Sedan",
      },
      status: "Pending",
      createdAt: "2023-10-01",
      remarks: "Pending approval",
    },
    {
      id: "veh-002",
      userId: "user-002",
      vehicle: {
        make: "Honda",
        series: "Civic",
        model: 2024,
        licensePlate: "XYZ-5473",
        type: "Sedan",
      },
      status: "Rejected",
      createdAt: "2023-10-05",
      remarks: "Rejected due to incomplete documents",
    },
  ]);
  const [vehicles] = useState([
    {
      id: "veh-001",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-02",
      stickerNumber: "STK-001",
      remarks: "Approved for campus use",
      schoolMember: true,
      vehicle: {
        make: "Toyota",
        series: "Vios",
        model: 2020,
        licensePlate: "ABC-1234",
        type: "Sedan",
      },
      status: "Approved",
    },
    {
      id: "veh-002",
      createdAt: "2023-10-05",
      updatedAt: "2023-10-06",
      stickerNumber: "STK-002",
      remarks: "Rejected due to incomplete documents",
      schoolMember: false,
      vehicle: {
        make: "Honda",
        series: "Civic",
        model: 2024,
        licensePlate: "XYZ-5473",
        type: "Sedan",
      },
      status: "Rejected",
    },
  ]);
  const [violations] = useState([ {
    id: "vio-001",
    userId: "user-001",
    date: "2024-09-15T08:00:00Z",
    remarks: "Speeding in a 30kph zone",
    status: "Unresolved",
    reporter: {
      id: "rep-001",
      firstName: "Officer",
      lastName: "Diaz",
    },
    vehicle: {
      make: "Honda",
      model: "Civic",
      licensePlate: "XYZ-5678",
    },
    violation: {
      violationName: "Over-speeding",
      category: "Speed Violation",
      penalty: 1500,
    },
  },
  {
    id: "vio-002",
    userId: "user-001",
    date: "2024-08-01T14:30:00Z",
    remarks: "Parked in a no-parking zone",
    status: "Resolved",
    reporter: {
      id: "rep-002",
      firstName: "Officer",
      lastName: "Reyes",
    },
    vehicle: {
      make: "Toyota",
      model: "Vios",
      licensePlate: "ABC-1234",
    },
    violation: {
      violationName: "Illegal Parking",
      category: "Parking Violation",
      penalty: 500,
    },
  },
]);
  const [activeTab, setActiveTab] = useState('Vehicles');
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ProfileHeader
        name="Jack Roberto"
        email="sample.test@gmail.com"
        avatarUrl=""
        />
      </View>
      
    <View style={styles.tabHeader}>
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
        <Entypo name="dots-three-horizontal" size={22} color="#8E9196" />
      </TouchableOpacity>
    </View>

    <Modal
     transparent={true}
     visible={menuVisible}
     onRequestClose={() => setMenuVisible(false)}
     animationType="fade">
      <TouchableOpacity style={styles.modalOverlay} onPressOut={() => setMenuVisible(false)}>
      <View style={styles.dropdownMenu}>
        <TouchableOpacity style={styles.dropdownItem} onPress={logout}>
          <Entypo name="log-out" size={16} color="white" style={styles.dropdownIcon} />
          <Text style={styles.dropdownText}>Logout</Text>
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
    </Modal>

    <View style={styles.content}>
      {activeTab === 'Vehicles' && (
        <VehicleTab vehicles={vehicles} />
      )}
      {activeTab === 'Violations' && (
        <ViolationsTab violations={violations} />
      )}
      {activeTab === 'Applications' && (
        <ApplicationsTab vehicleApplications={vehicleApplications} />
      )}
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
},
headerContainer: {
  flex: 1,
  padding: 10,
  marginTop: 45,
  justifyContent: 'center',
  alignItems: 'center',
},
tabHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#333',
  backgroundColor: '#2C2C2C',
},
menuButton: {
  padding: 8,
},
dropdownMenu: {
  backgroundColor: '#2C2C2C',
  margin: 8,
  borderRadius: 8,
},
dropdownItem: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  borderWidth: 1,
  borderColor: 'white',
},
dropdownIcon: {
  marginRight: 8,
},
dropdownText: {
  color: 'white',
  fontSize: 14,
},
content: {
  flex: 1,
  minHeight: 100,
},
modalOverlay: { 
  flex: 1, 
  backgroundColor: 'rgba(0,0,0,0.2)', 
  justifyContent: 'center', 
  alignItems: 'flex-end', 
},
});

