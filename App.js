// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaPastas from "./screens/ListaPastas";
import CadastroCliente from "./screens/CadastroCliente";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ListaPastas"
        screenOptions={{
          headerStyle: { backgroundColor: "#007bff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="ListaPastas"
          component={ListaPastas}
          options={{ title: "Pastas dos Clientes" }}
        />
        <Stack.Screen
          name="CadastroCliente"
          component={CadastroCliente}
          options={{ title: "Adicionar Cliente" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
