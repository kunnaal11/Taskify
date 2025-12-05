import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/axios";
import { Feather } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(user);
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkStyles : lightStyles;

  useEffect(() => {
    loadProfile();
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const saved = await AsyncStorage.getItem("darkMode");
    if (saved) setDarkMode(JSON.parse(saved));
  };

  const toggleTheme = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  const loadProfile = async () => {
    try {
      const res = await api.get("/profile");
      setProfile(res.data);
    } catch (error) {
      console.log("Using cached user data");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={[styles.container, theme.container]}>
      <View style={[styles.header, theme.header]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Feather
            name="chevron-left"
            size={24}
            color={darkMode ? "#F9FAFB" : "#111827"}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, theme.text]}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={[styles.avatarContainer, theme.card]}>
          <View style={styles.avatar}>
            <Feather name="user" size={40} color="#3B82F6" />
          </View>
          <Text style={[styles.name, theme.text]}>
            {profile?.name || "User"}
          </Text>
          <Text style={[styles.email, theme.subText]}>
            {profile?.email || "No email"}
          </Text>
        </View>

        <View style={[styles.section, theme.card]}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: "#DBEAFE" }]}>
                <Feather name="moon" size={20} color="#3B82F6" />
              </View>
              <Text style={[styles.settingText, theme.text]}>Dark Mode</Text>
            </View>
            <Switch value={darkMode} onValueChange={toggleTheme} />
          </View>
        </View>

        <View style={[styles.section, theme.card]}>
          <View style={styles.infoRow}>
            <View style={[styles.iconBox, { backgroundColor: "#FEF3C7" }]}>
              <Feather name="mail" size={20} color="#F59E0B" />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, theme.subText]}>Email</Text>
              <Text style={[styles.infoValue, theme.text]}>
                {profile?.email || "N/A"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={[styles.iconBox, { backgroundColor: "#D1FAE5" }]}>
              <Feather name="shield" size={20} color="#10B981" />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, theme.subText]}>
                Account Status
              </Text>
              <Text style={[styles.infoValue, theme.text]}>Active</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#FFF" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backBtn: { width: 40, height: 40, justifyContent: "center" },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  content: { flex: 1, padding: 20 },
  avatarContainer: {
    alignItems: "center",
    padding: 30,
    borderRadius: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 4 },
  email: { fontSize: 14 },
  section: { padding: 20, borderRadius: 16, marginBottom: 16 },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  settingText: { fontSize: 16, fontWeight: "500" },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, marginBottom: 4 },
  infoValue: { fontSize: 16, fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 12 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 20,
  },
  logoutText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
});

const lightStyles = StyleSheet.create({
  container: { backgroundColor: "#F3F4F6" },
  header: { backgroundColor: "#FFF" },
  text: { color: "#111827" },
  subText: { color: "#6B7280" },
  card: { backgroundColor: "#FFF" },
});

const darkStyles = StyleSheet.create({
  container: { backgroundColor: "#111827" },
  header: { backgroundColor: "#1F2937" },
  text: { color: "#F9FAFB" },
  subText: { color: "#9CA3AF" },
  card: { backgroundColor: "#1F2937" },
});
