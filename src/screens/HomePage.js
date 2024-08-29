import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import { MapStyle } from "../../assets/mapStyle";
import { CustomButton } from "../components/index";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";

const HomePage = () => {
  const [location, setLocation] = useState(null);
  const [barbarosData, setBarbarosData] = useState([]);
  const [locationLoading, setLocationLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);


  const handleLogout = () => {
    dispatch(logout());
  };

  const [mapRegion, setMapRegion] = useState({
    latitude: 39.87952924125737,
    longitude: 32.831225554797186,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0421,
  });

  const handleInfo =()=>{
    setModalVisible(true);
  }

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
        setDataLoading(false);
      } catch (error) {
        console.error("Dolphins verileri alınırken hata oluştu: ", error);
        setDataLoading(false);
      }
    };

    getAllBarbarosData();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationLoading(false);
        return;
      }
      
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 2,
        },
        (location) => {
          setLocation(location);
          const newRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012,
          };
          setMapRegion(newRegion);
          setLocationLoading(false);
        }
      );
      return () => subscription.remove();
    })();
  }, []);

  const goToMyLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0052,
          longitudeDelta: 0.0052,
        },
        2000
      );
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {locationLoading || dataLoading ? (
          <Loading />
        ) : (
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              showsUserLocation={true}
              region={mapRegion}
              customMapStyle={MapStyle}
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
              handlePressButton={() => navigation.navigate("QRScanner")}
              title={"Sürüşe Başla"}
              setWidth={"90%"}
              setHeight={45}
              handleBackgroundColor={"#0a78ca"}
              handlePressedBackgroundColor={"#b3cde0"}
              icon="qr-code-outline"
            />
            <Image
              style={styles.topRoundButton}
              source={require("../../assets/barbaros.jpg")}
            />
            <TouchableOpacity
              style={[styles.roundButton, styles.rightButton]}
              onPress={goToMyLocation}
            >
              <Ionicons name="navigate" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.roundButton, styles.leftButton]}>
              <MaterialCommunityIcons name="dolphin" size={26} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.logoutButton, styles.leftLogoutButton]}
            >
              <MaterialCommunityIcons name="logout" size={26} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleInfo}
              style={[styles.helpButton, styles.rightHelpButton]}
            >
              <MaterialCommunityIcons name="help" size={26} color="white" />
            </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={()=>setModalVisible(false)}
              >                
                 <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                  <TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                      >
                        <Ionicons name="close" size={38} color="white" />
                      </TouchableOpacity>

                      <View style={styles.circle}>
                        <Text style={styles.modalText}>Bilgilendirme</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
              </Modal>
          </View>
        )}
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
    top: 50,
    alignSelf: "center",
    width: 240,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#0a78ca",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  modalView: {
    width: "85%",
    height: "59%",
    marginBottom:70,
    backgroundColor: "rgba(199, 230, 245, 1)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  modalText: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 7,
  },
});
