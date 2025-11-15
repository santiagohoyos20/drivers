import Constants from "expo-constants";
import polyline from "polyline";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";

interface Coordinate {
  latitude: number;
  longitude: number;
}

const GOOGLE_API_KEY =
  Constants.expoConfig?.extra?.googleMapsApiKey ||
  process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ||
  "";

export default function Map() {
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const origin: Coordinate = { latitude: 10.9639, longitude: -74.7964 };
  const destination: Coordinate = { latitude: 10.995, longitude: -74.784 };

  const fetchRoute = async () => {
    try {
      setLoading(true);

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`;

      const res = await fetch(url);
      const json = await res.json();
      console.log("ruta", json)
      if (!json.routes || json.routes.length === 0) {
        console.warn("No se encontró ruta");
        setRouteCoords([]);
        return;
      }

      // Decodificar polyline
      const points: number[][] = polyline.decode(
        json.routes[0].overview_polyline.points
      );

      const coords: Coordinate[] = points.map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));

      setRouteCoords(coords);
    } catch (error) {
      console.error("Error al obtener la ruta:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoute();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
      provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        userInterfaceStyle="light"
      >
        <Marker title="Origen" coordinate={origin} />
        <Marker title="Destino" coordinate={destination} />

        {/* Dibujar la ruta */}
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={4} strokeColor="#1E90FF" />
        )}
      </MapView>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator />
          <Text>Cargando ruta...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "90%", height: "50%", borderRadius: 12, overflow: "hidden", borderColor: "#ccc", borderWidth: 1, marginBottom: 20 },
  map: { flex: 1 },
  loading: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
});
