import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const VisListaMaterias = (props) => {
  return (
    <View>
      <Button
        title="Registrar Materia"
        onPress={() => props.navigation.navigate("VAMateria")}
      />
      <Text>VisListaMaterias</Text>
    </View>
  );
};

export default VisListaMaterias;

const styles = StyleSheet.create({});
