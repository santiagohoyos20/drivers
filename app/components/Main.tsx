import { Button, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "../../hooks/useUser";
import MapView from "./MapView";

export default function Main() {
  const { user, logout } = useUser();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { flex: 1, paddingTop: insets.top, alignItems: "center" }]}>
      <Text style={styles.title}>Bienvenido</Text>
      {/* <Text>{user.email}</Text> */}
        <MapView />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    paddingBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    paddingBottom: 20,
  },
});