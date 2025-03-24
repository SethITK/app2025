import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import VisListaAlumnos from "./screens/VisListaAlumnos";
import VisListaMaterias from "./screens/VisListaMaterias";
import VisGPS from "./screens/VisGPS";
import VisIoT from "./screens/VisIoT";
import VisCalificaciones from "./screens/VisCalificaciones";
import Login from "./screens/Login";
import Entypo  from 'react-native-vector-icons/Entypo';
import VisAltaAlmno from "./screens/VisAltaAlmno";
import VisModificarAlumno from "./screens/VisModificarAlumno";
import VisAltaMaterias from "./screens/VisAltaMaterias";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
        }}
      />
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{
            headerShown:false,
        }}
      />
      <Stack.Screen
        name="VAAlumno"
        component={VisAltaAlmno}
        options={{presentation:"modal",title:"Registrar Alumno"
        }}
      />
          <Stack.Screen
        name="VEAlumno"
        component={VisModificarAlumno}
        options={{presentation:"modal",title:"Modificar Alumno"
        }}
      />
      <Stack.Screen
        name="VAMateria"
        component={VisAltaMaterias}
        options={{presentation:"modal",title:"Registrar Materia"
        }}
      />
    </Stack.Navigator>
  );
}

function MyDrawer(props) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
            title: 'Home',
            drawerIcon: config => <Entypo
            size={23}
            name= "home"/>
           }}
      />
      <Drawer.Screen
        name="VLA"
        component={VisListaAlumnos}
        options={{ title: "Alumnos", drawerIcon: config => <Entypo
            size={23}
            name= "user"/> }}
      />
      <Drawer.Screen
        name="VLM"
        component={VisListaMaterias}
        options={{ title: "Materias",drawerIcon: config => <Entypo
            size={23}
            name= "book"/>  }}
      />
            <Drawer.Screen
        name="VC"
        component={VisCalificaciones}
        options={{ title: "Calificaciones",drawerIcon: config => <Entypo
          size={23}
          name= "bookmarks"/> }}
      />
            <Drawer.Screen
        name="VIT"
        component={VisIoT}
        options={{ title: "IoT",drawerIcon: config => <Entypo
          size={23}
          name= "cloud"/> }}
      />
            <Drawer.Screen
        name="VGPS"
        component={VisGPS}
        options={{ title: "GPS",drawerIcon: config => <Entypo
          size={23}
          name= "location"/> }}
      />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
