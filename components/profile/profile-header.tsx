import { Image, StyleSheet, Text, View } from "react-native";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl: string | null;
}

export const ProfileHeader = ({ name, email, avatarUrl }: ProfileHeaderProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          )}
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: 16
  },
  avatar: {
    height: 128,
    width: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: "#ffffff"
  },
  avatarFallback: {
    backgroundColor: "#EBEAF0",
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
    marginBottom: 8
  },
  email: {
    fontSize: 16,
    color: "white",
    marginBottom: 8
  },
  avatarText: {
    fontSize: 28,
    color: "#333",
    fontWeight: "600"
  }
});
