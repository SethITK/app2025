import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const Login = (props) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Correo</Text>
      <Text>Contraseña</Text>

      <Button
        title="Ingresar"
        onPress={() => props.navigation.navigate("Drawer")}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
