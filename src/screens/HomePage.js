import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import MapView from "react-native-maps";
import "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CustomButton } from "../components";
import BottomSheetPage from "./BottomSheetPage";

const HomePage = () => {
  const sheetRef = useRef(null);
  const [mapRegion, setmapRegion] = useState({
    latitude: 39.87952924125737,
    longitude: 32.831225554797186,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0421,
  });

  const renderContent = () => (
    <View style={styles.sheetContent}>
      <Text style={styles.sheetText}> MENU </Text>
      <Button title="Paneli Kapat" onPress={() => sheetRef.current.snapTo(1)} />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView locatio style={styles.map} region={mapRegion} />
          <View style={styles.overlay}>
            <Pressable
              style={{
                backgroundColor: "#0a78c0",
                borderRadius: 25,
                position: "absolute",
                bottom: 55,
                left: 85,
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => sheetRef.current?.expand()}
            >
              <Text style={{ color: "orange" }}>///</Text>
            </Pressable>
          </View>
          <BottomSheet
            ref={sheetRef}
            index={-1}
            snapPoints={["50%", "85%"]}
            enablePanDownToClose={true}
          >
            <View style={styles.contentContainer}>
              <BottomSheetPage />
              {/* <Text>Merhaba .....</Text>
              <Text>Cuzdan .....</Text>
              <Text>Bize Ulasin .....</Text>
              <Text>Suruslerim .....</Text>
              <Text>Profil .....</Text>
              <Text>Cikis Yap .....</Text> */}
            </View>
          </BottomSheet>
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
  tabContainer: {
    backgroundColor: "#0a78c0",

    height: 15,
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

  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  sheetContent: {
    backgroundColor: "white",
    padding: 16,
    height: 450,
  },
  sheetText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  overlay: {
    position: "absolute", // Position overlay absolutely within mapContainer

    left: 230, // Adjust as needed
    // Adjust as needed
    bottom: 650, // Adjust as needed
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Ensure overlay is on top of the map
  },
  overlayText: {
    color: "white", // Adjust as needed
    fontSize: 18,
    marginBottom: 20,
  },
});
