import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = ["Vehicles", "Violations", "Applications"];

export const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity key={tab} onPress={() => onTabChange(tab)} style={styles.tabButton}>
              <Text
                style={[styles.tabText, isActive ? styles.activeTabText : styles.inactiveTabText]}
              >
                {tab}
              </Text>
              {isActive}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd"
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  tabButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center"
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500"
  },
  activeTabText: {
    color: "#3C3C3EFF"
  },
  inactiveTabText: {
    color: "black"
  }
});
