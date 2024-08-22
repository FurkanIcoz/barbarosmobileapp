import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import { MapStyle } from "../../assets/mapStyle";
import { CustomButton } from "../components/index";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const DrivingPage = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const [barbarosData, setBarbarosData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [mapRegion, setMapRegion] = useState({
    latitude: 39.87952924125737,
    longitude: 32.831225554797186,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0421,
  });

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
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      };
      setMapRegion(newRegion);
    })();
  }, []);

  const goToMyLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0034,
          longitudeDelta: 0.003,
        },
        2000
      );
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
            region={mapRegion}
            customMapStyle={MapStyle}
          ></MapView>

          <CustomButton
            style={styles.customButton}
            handlePressButton={() => console.log("Sürüş Bitirildi")}
            title={"Sürüşü Bitir"}
            setWidth={"90%"}
            setHeight={45}
            handleBackgroundColor={"#0a78ca"}
            handlePressedBackgroundColor={"#b3cde0"}
            //icon="qr-code-outline" // QR simgesi eklenir
          />
          <Image
            style={styles.topRoundButton}
            source={require("../../assets/barbaros.jpg")}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default DrivingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  helpButton: {
    position: "absolute",
    top: 80,
    right: 22,
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "rgba(10, 120, 192, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  logoutButton: {
    position: "absolute",
    top: 80,
    left: 22,
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "rgba(10, 120, 192, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  leftLogoutButton: {},
  customButton: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    borderRadius: 14,
  },
  topRoundButton: {
    position: "absolute",
    top: 70,
    width: "45%",
    right: 110,
    height: 30,
    borderRadius: 30,
    backgroundColor: "rgba(10, 120, 192, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    opacity: 0.7,
  },
  roundButton: {
    position: "absolute",
    bottom: 155,
    width: 45,
    height: 45,
    borderRadius: 10,
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
