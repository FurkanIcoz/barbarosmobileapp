import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.button}>{children}</View>
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  buttonContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(246, 246, 246)",
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
