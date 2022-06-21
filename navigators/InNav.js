import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home";
import colors from "../colors";

const Nav = createNativeStackNavigator();

const InNav = () => (
  <Nav.Navigator
    screenOptions={{
      presentation: "modal",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.backgroundColor,
      },
      title: "Coins",
      headerTitleAlign: "center",
    }}
  >
    <Nav.Screen name="Home" component={Home} />
  </Nav.Navigator>
);

export default InNav;
