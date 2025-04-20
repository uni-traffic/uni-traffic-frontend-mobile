import { ApplicationsTab } from "@/components/profile/applications-tab";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { VehicleTab } from "@/components/profile/vehicle-tab";
import { ViolationsTab } from "@/components/profile/violations-tab";
import { useAuth } from "@/context/authContext";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("Vehicles");
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <ProfileHeader
            name={`${user?.firstName} ${user?.lastName}`}
            email={`${user?.email}`}
            avatarUrl=""
          />
        </View>

        <View style={styles.tabHeader}>
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
            <Entypo name="log-out" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === "Vehicles" && <VehicleTab />}
          {activeTab === "Violations" && <ViolationsTab />}
          {activeTab === "Applications" && <ApplicationsTab />}
        </View>
      </SafeAreaView>
      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <Text style={styles.confirmTitle}>Log out</Text>
            <Text style={styles.confirmMessage}>Are you sure you want to log out?</Text>

            <View style={styles.confirmButtonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setMenuVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000"
  },
  tabHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#ddd"
  },
  menuButton: {
    padding: 8
  },
  dropdownMenu: {
    backgroundColor: "#eee",
    margin: 8,
    borderRadius: 8
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "black"
  },
  dropdownIcon: {
    marginRight: 8,
    color: "black"
  },
  dropdownText: {
    color: "black",
    fontSize: 14
  },
  content: {
    flex: 1,
    minHeight: 100
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center"
  },
  confirmModal: {
    backgroundColor: "#fff",
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 10,
    elevation: 5
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  confirmMessage: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20
  },
  confirmButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  cancelButton: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  cancelButtonText: {
    color: "#8E9196",
    fontSize: 16
  },
  logoutButton: {
    backgroundColor: "#E53935",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16
  }
});
