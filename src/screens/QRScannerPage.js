import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';

const QRScannerPage = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (permission === null) {
    // Kamera izinleri henüz yüklenmedi.
    return <View />;
  }

  if (!permission.granted) {
    // Kamera izinleri henüz verilmedi.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Kamerayı gösterebilmek için izninize ihtiyacımız var</Text>
        <Button onPress={requestPermission} title="İzni Ver" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`QR kodu tarandı! Tip: ${type} Veri: ${data}`);
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera}  barcodeScannerSettings={{barcodeTypes:['qr']}} onBarcodeScanned={handleBarCodeScanned}>
        <View style={styles.buttonContainer}>
        
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default QRScannerPage;
