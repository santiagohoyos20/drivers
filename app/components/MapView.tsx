import polyline from "@mapbox/polyline";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

// Tipo para coordenadas
interface Coordinate {
  latitude: number;
  longitude: number;
}

export default function MapViewComponent() {
  const [deviceLocation, setDeviceLocation] = useState<Coordinate | null>(null);
  const [routeCoords, setRouteCoords] = useState<Coordinate[]>([]);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);

  const initialRegion = {
    latitude: 10.9878,
    longitude: -74.7889,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  // Obtener ubicación del dispositivo en tiempo real
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      // Observar cambios de ubicación en tiempo real
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Actualizar cada 5 segundos
          distanceInterval: 10, // O cuando se mueva 10 metros
        },
        (location) => {
          setDeviceLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          console.log("Ubicación actualizada:", location.coords);
        }
      );
    })();

    // Limpiar suscripción al desmontar
    return () => {
      locationSubscription.current?.remove();
    };
  }, []);

  // Waypoints para la ruta
  const waypoints: Coordinate[] = [
    { latitude: 11.017456, longitude: -74.851353 },
    { latitude: 10.944124, longitude: -74.833767 },
    { latitude: 10.908506, longitude: -74.793681 },
  ];

  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Función para obtener la ruta
  const fetchRoute = async () => {
    try {
      const waypointsStr = waypoints
        .slice(1, -1)
        .map((wp) => `${wp.latitude},${wp.longitude}`)
        .join("|");

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${
        waypoints[0].latitude
      },${waypoints[0].longitude}&destination=${
        waypoints[waypoints.length - 1].latitude
      },${
        waypoints[waypoints.length - 1].longitude
      }&waypoints=${waypointsStr}&key=${GOOGLE_API_KEY}`;

      const res = await fetch(url);
      const json = await res.json();

      console.log("Respuesta de ruta:", json);

      if (!json.routes || json.routes.length === 0) {
        console.warn("No se encontró ruta");
        setRouteCoords([]);
        return;
      }

      // Decodificar polyline
      const points: number[][] = polyline.decode(
        json.routes[0].overview_polyline.points
      );

      const coordinates: Coordinate[] = points.map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));

      setRouteCoords(coordinates);
      console.log("Coordenadas de la ruta:", coordinates.length, "puntos");
    } catch (error) {
      console.error("Error al obtener la ruta:", error);
    }
  };

  // Cargar ruta al montar el componente
  useEffect(() => {
    if (GOOGLE_API_KEY) {
      fetchRoute();
    } else {
      console.warn("No se configuró GOOGLE_API_KEY");
    }
  }, []);

  console.log("Device Location:", deviceLocation);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* Marcador de Inicio - Verde */}
        <Marker
          coordinate={waypoints[0]}
          title="Inicio"
          description="Punto de partida"
          pinColor="green"
        />

        {/* Marcador de Destino - Rojo */}
        <Marker
          coordinate={waypoints[waypoints.length - 1]}
          title="Destino"
          description="Punto de llegada"
          pinColor="red"
        />

        {/* Marcador de Ubicación Actual - Busesito */}
        {deviceLocation && (
          <Marker
            coordinate={deviceLocation}
            title="Mi Ubicación"
            description="Tu ubicación actual"
          >
            <View style={styles.busMarker}>
              <Text style={styles.busEmoji}>🚌</Text>
            </View>
          </Marker>
        )}

        {/* Polyline de la ruta */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#4285F4"
            strokeWidth={5}
          />
        )}
      </MapView>
    </View>
  );
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
  map: {
    width: "100%",
    height: "100%",
  },
  busMarker: {
    backgroundColor: 'transparent',
  },
  busEmoji: {
    fontSize: 24,
  },
});