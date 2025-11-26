import { SafeAreaProvider } from "react-native-safe-area-context";
import { useUser } from "../../hooks/useUser";
import Main from "../components/Main";
import { Text } from "react-native";



export default function Rutas() {
  const { user, logout } = useUser();

  return (
    <SafeAreaProvider>
        <Text>
        esto es rutas
        </Text>
    </SafeAreaProvider>
  );
}
