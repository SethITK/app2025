import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './screens/Home';
import VisListaAlumnos from './screens/VisListaAlumnos';
import VisListaMaterias from './screens/VisListaMaterias';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} options={{ title: "Inicio" }} />
            <Drawer.Screen name="VLA" component={VisListaAlumnos} options={{ title: "Alumnos" }} />
            <Drawer.Screen name="VLM" component={VisListaMaterias} options={{ title: "Materias" }} />
        </Drawer.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
}
