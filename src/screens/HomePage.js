import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import { MapStyle } from "../../assets/mapStyle";
import {CustomButton} from '../components/index'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const [barbarosData, setBarbarosData] = useState([]);

  const [mapRegion, setMapRegion] = useState({
    latitude: 39.87952924125737,
    longitude: 32.831225554797186,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getAllBarbarosData = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "dolphins"));
        const dolphinsArray = [];

        querySnapshot.forEach((doc) => {
          dolphinsArray.push({ id: doc.id, ...doc.data() });
        });

        setBarbarosData(dolphinsArray);
       
      } catch (error) {
        console.error("Error fetching dolphins data: ", error);
      }
    };

    getAllBarbarosData();
  }, [barbarosData]);

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
          >
            {barbarosData.map((dolphin) => {
              if (
                dolphin.current_location?.latitude &&
                dolphin.current_location?.longitude
              ) {
                return (
                  <Marker
                    key={dolphin.id}
                    coordinate={{
                      latitude: dolphin.current_location.latitude,
                      longitude: dolphin.current_location.longitude,
                    }}
                    title={`Dolphin ID: ${dolphin.id}`}
                    description={`Battery Level: ${dolphin.battery_level}%`}
                  >
                    <MaterialCommunityIcons
                      name="dolphin"
                      size={30}
                      color="blue"
                    />
                  </Marker>
                );
              }
              return null;
            })}
          </MapView>

          <CustomButton
            style={styles.customButton} 
            handlePressButton={()=>console.log("PRESSED BUTTON")}
            title={"Sürüşe Başla"}
            setWidth={"80%"}
            setHeight={40}
            handleBackgroundColor={"#0a78ca"}
            handlePressedBackgroundColor={"#b3cde0"}
            icon="qr-code-outline" // QR simgesi eklenir

          />
          <Image style={styles.topRoundButton} source={require('../../assets/barbaros.jpg')}/>
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
      </View>
    </GestureHandlerRootView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    width: "100%",
    height: "100%",
  },
  customButton: {
    position: 'absolute',
    bottom: 10,  // Butonun alt tarafta yer almasını sağlar
    alignSelf: 'center',  // Butonu ortalar
    borderRadius:14


  },
  topRoundButton:{
    position: "absolute",
    top: 70,
    width:"45%",
    right:110,
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
    opacity:0.7
  },
  roundButton: {
    position: "absolute",
    bottom: 80,
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
