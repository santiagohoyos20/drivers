import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Platform, StyleSheet, Text } from 'react-native';

export default function MapView() {
  const cameraPosition = {
    coordinates: {
      latitude: 10.9878,
      longitude: -74.7889,
    },
    zoom: 11,      // acercamiento
  };

  if (Platform.OS === 'ios') {
    return <AppleMaps.View style={{ flex: 1 }} />;
  } else if (Platform.OS === 'android') {
    return <GoogleMaps.View style={styles.container} cameraPosition={cameraPosition}/>;
  } else {
    return <Text>Maps are only available on Android and iOS</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "50%",
    borderRadius: 12,
    overflow: "hidden",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
  },
});