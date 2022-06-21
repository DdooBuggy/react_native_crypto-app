import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Join from "../screens/Join";
import Login from "../screens/Login";
import colors from "../colors";

const Nav = createNativeStackNavigator();

const OutNav = () => (
  <Nav.Navigator
    screenOptions={{
      presentation: "modal",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.backgroundColor,
      },
    }}
  >
    <Nav.Screen name="Login" component={Login} />
    <Nav.Screen name="Join" component={Join} />
  </Nav.Navigator>
);

export default OutNav;
