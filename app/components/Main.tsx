import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "../../hooks/useUser";
import MapView from "./MapView";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Main() {
  const { user, logout } = useUser();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFECE0" }}>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top }
        ]}
      >
        {/* Tarjeta estilo VPN */}
        <View style={styles.card}>
          
          {/* Header dentro de la tarjeta */}
          <View style={styles.header}>
            <Text style={styles.title}>Tu ruta</Text>

            <Pressable onPress={logout} style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={18} color="#fff" />
            </Pressable>
          </View>

          {/* Mapa */}
          <View style={styles.mapContainer}>
            <MapView />
          </View>


        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffece0ff",
    justifyContent: "center",
    alignItems: "center",
  },

  // Tarjeta parecida a la del VPN
  card: {
    width: "93%",
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  logoutButton: {
    backgroundColor: "#FFCC00",
    padding: 8,
    borderRadius: 10,
  },

  // Contenedor del mapa dentro de la tarjeta
  mapContainer: {
    width: "100%",
    height: 580,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: -10,
  },

  // Botón circular central tipo VPN
  powerButton: {
    width: 85,
    height: 85,
    backgroundColor: "#E9ECFF",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  timeText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
});
