import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigation from "./src/navigation/rootNavigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
