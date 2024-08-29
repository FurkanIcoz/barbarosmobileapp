import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "../components";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

const { width, height } = Dimensions.get("window");
const qrSize = 250;

const QRScannerPage = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedAracId,setScannedAracId] = useState("")
  const navigation = useNavigation();
  const handleBarCodeScanned = async ({ type, data, bounds }) => {
    if (isInQRFrame(bounds)) {
      setScanned(true);
      setScanData({ type, data });
      setScannedAracId(data)
      try {
        const db = getFirestore();
        const docRef = doc(db, "dolphins", data);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const batteryLevel = docSnap.data().battery_level;
          setScanData({ type, data: { ...docSnap.data(), battery_level: batteryLevel } });
        } else {
          console.log("Belirtilen belge bulunamadı");
        }
      } catch (error) {
        console.error("Hata:", error);
      }
  
      setModalVisible(true);
    }
  };

  

  const isInQRFrame = (bounds) => {
    if (!bounds || !bounds.origin) return false;

    const { origin, size } = bounds;
    const x = origin.x + size.width / 2;
    const y = origin.y + size.height / 2;

    const frameLeft = (width - qrSize) / 2;
    const frameRight = (width + qrSize) / 2;
    const frameTop = (Dimensions.get("window").height - qrSize) / 2;
    const frameBottom = (Dimensions.get("window").height + qrSize) / 2;

    return (
      x >= frameLeft && x <= frameRight && y >= frameTop && y <= frameBottom
    );
  };

  const handleStartDriving = async () => {
    try {
      const aracId = scannedAracId;
      const db = getFirestore();
      const dolpRef = doc(db, "dolphins", aracId);
      
      await updateDoc(dolpRef, {
        status: true,
      });
      navigation.navigate("DrivingPage", { qrData: aracId });
      setModalVisible(false);

    } catch (error) {
      console.log(`LINE 91:  ${error}`)
    }
  };

  if (permission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Yükleniyor...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Kamerayı gösterebilmek için izninize ihtiyacımız var
        </Text>
        <Button onPress={requestPermission} title="İzni Ver" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay} />
          <View style={styles.middleContainer}>
            <View style={styles.sideOverlay} />
            <View style={styles.qrArea} />
            <View style={styles.sideOverlay} />
          </View>

          <View style={styles.bottomOverlay} />
        </View>

        {/* {scanned && (
          <View style={styles.resultContainer}>
            <Text style={styles.scanText}>Taranan Veri: {scanData?.data}</Text>
            <Button onPress={handleRescan} title="Tekrar Tara" />
          </View>
        )} */}
      </CameraView>
      <View
        style={{
          backgroundColor: "rgba(39, 230, 245, 0.9)",
          borderWidth: 0,
          textAlign: "center",
          justifyContent: "center",
          width: "90%",
          position: "absolute",
          top: 40,
          left: 10,
          borderRadius: 20,
        }}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="close" size={38} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "rgba(193, 193, 202, 1)",
          borderWidth: 0,
          textAlign: "center",
          justifyContent: "center",
          width: "90%",
          position: "absolute",
          bottom: 200,
          left: 20,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            justifyContent: "center",
            fontSize: 23,
          }}
        >
          Araç üzerinde bulunan QR kodunu okutunuz
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="close" size={38} color="white" />
            </TouchableOpacity>

            <View style={styles.circle}>
              <Image
                style={styles.topRoundButton}
                source={require("../../assets/barbaros.jpg")}
              />
              <Text style={styles.modalText}>Fiyatlandırma</Text>
              <Text style={styles.pricingText}>Baslangıç: 0.99₺</Text>
              <Text style={styles.pricingText}>Dakika: 0.99₺</Text>
              <Text style={styles.modalText}>Şarj Durumu</Text>
              <Text style={styles.pricingText}>{scanData?.data?.battery_level || 0}%</Text>
              </View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartDriving}
            >
              <Text style={styles.textStyle}>Sürüşe Başla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  topOverlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  middleContainer: {
    flexDirection: "row",
  },
  sideOverlay: {
    width: (width - qrSize) / 2,
    height: qrSize,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  qrArea: {
    width: qrSize,
    height: qrSize,
    borderWidth: 2,
    borderColor: "white",
  },
  bottomOverlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  resultContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 16,
    borderRadius: 8,
  },
  scanText: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  modalView: {
    width: "85%",
    height: "79%",
    backgroundColor: "rgba(199, 230, 245, 0.8)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  circle: {
    width: 300,
    height: 480,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 7,
  },
  pricingText: {
    fontSize: 22,
    color: "#7F8C8D",
    marginVertical: 6,
  },
  startButton: {
    position: "absolute",
    bottom: 160,
    //marginTop: 125,
    backgroundColor: "#2196f3",
    padding: 10,
    borderRadius: 10,
    width: 240,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 26,
  },
  topRoundButton: {
    position: "absolute",
    top: 50,
    width: "90%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "rgba(10, 120, 192, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    opacity: 1,
  },
  // modalButtons: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   width: "100%",
  // },
  // button: {
  //   borderRadius: 10,
  //   padding: 10,
  //   elevation: 2,
  //   backgroundColor: "#2196F3",
  //   width: 100,
  //   alignItems: "center",
  // },
  // buttonClose: {
  //   backgroundColor: "#f44336",
  // },
  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
});

export default QRScannerPage;
