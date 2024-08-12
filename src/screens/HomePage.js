import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null); // MapView için ref oluşturma

  const [mapRegion, setMapRegion] = useState({
    latitude: 39.87952924125737,
    longitude: 32.831225554797186,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    goToMyLocation();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0421,
      };
      setMapRegion(newRegion);
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
      console.log("Konum bilgisi:", JSON.stringify(location));
    })();
  }, []);
  const goToMyLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0421,
        },
        2000
      );
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView ref={mapRef} style={styles.map}>
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              >
                <Ionicons name="egg-sharp" size={30} color="blue" />
              </Marker>
            )}
          </MapView>

          <TouchableOpacity
            style={[styles.roundButton, styles.rightButton]}
            onPress={goToMyLocation}
          >
            <Ionicons name="navigate" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.roundButton, styles.leftButton]}>
            <MaterialCommunityIcons name="dolphin" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  roundButton: {
    position: "absolute",
    bottom: 20,
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: "rgba(10, 120, 192, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  rightButton: {
    right: 22,
  },
  leftButton: {
    left: 22,
  },
});
