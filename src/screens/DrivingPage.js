import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View, Alert } from "react-native";
import MapView from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { MapStyle } from "../../assets/mapStyle";
import { CustomButton } from "../components/index";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const DrivingPage = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 39.87952924125737,
    longitude: 32.831225554797186,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0421,
  });

  const [elapsedTime, setElapsedTime] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0.0);
  const [locationLoading, setLocationLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const route = useRoute();
  const { qrData } = route.params;
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  const [charge, setCharge] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "dolphins", qrData);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCharge(docSnap.data().battery_level);
      } else {
        console.log("Veri Bulunamadı!");
      }
    });

    return () => unsubscribe();
  }, [qrData]);

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
          distanceInterval: 1,
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

    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    const dollarInterval = setInterval(() => {
      setDollarAmount((prevAmount) => prevAmount + 2);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(dollarInterval);
    };
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  const handleFinishDrive = async () => {
    try {
      const db = getFirestore();
      const now = new Date();
      const startTime = new Date(now.getTime() - elapsedTime * 1000);
      const endTime = now;
      const date = now.toISOString().split("T")[0];

      await addDoc(collection(db, "rides"), {
        duration: formatTime(elapsedTime),
        price: dollarAmount,
        vehicleId: qrData,
        userId: user.uid,
        date: date,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });
      Alert.alert(
        "Sürüş Tamamlandı",
        "Barbaros'u Tercih Ettiğiniz İçin Teşekkür Ederiz"
      );
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "HATA",
        "Sürüş Tamamlanırken Hata Oluştu, Lütfen Destek Ekiplerimizle İletişime Geçin"
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
          />

          <View style={styles.drivingSummary}>
            <Text style={styles.titleText}>Sürüş Başladı</Text>

            <View style={styles.sumIcons}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="battery-half-sharp"
                  size={36}
                  color={"#0a78ca"}
                />
                <Text style={styles.iconLabel}>{charge}%</Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name="timer-sharp" size={36} color={"#0a78ca"} />
                <Text style={styles.iconLabel}>{formatTime(elapsedTime)}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name="wallet-sharp" size={36} color={"#0a78ca"} />
                <Text style={[styles.iconLabel, styles.dollarText]}>
                  {dollarAmount}$
                </Text>
              </View>
            </View>
          </View>

          <CustomButton
            style={styles.customButton}
            handlePressButton={handleFinishDrive}
            title={"Sürüşü Bitir"}
            setWidth={"95%"}
            setHeight={45}
            handleBackgroundColor={"#0a78ca"}
            handlePressedBackgroundColor={"#b3cde0"}
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
    backgroundColor: "#f0f4f8",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  drivingSummary: {
    position: "absolute",
    bottom: 90,
    borderRadius: 15,
    width: "95%",
    left: "2.5%",
    right: "2.5%",
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
  },
  titleText: {
    fontWeight: "700",
    fontSize: 28,
    color: "#0a78ca",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 10,
  },
  sumIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#0a78ca",
  },
  dollarText: {
    color: "#d9534f", // Dolar değeri için farklı bir renk
  },
  customButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: 14,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  topRoundButton: {
    position: "absolute",
    top: 50, // Yukarıda konumlandırma
    alignSelf: "center", // Ortaya hizalama
    width: 240,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#0a78ca",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Görüntünün yuvarlak çerçeve içinde kalmasını sağlar
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: "100%", // Görüntüyü tam olarak yuvarlağın içine oturtur
    height: "100%",
    resizeMode: "cover", // Görüntüyü alanın tamamına yayar
  },
});
