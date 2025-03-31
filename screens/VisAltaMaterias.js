import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';

const VisAltaMaterias = (props) => {
  const [materia, setMateria] = useState({
    matClave: "",
    matDescripcion: "",
    matPlan: "",
    matCreditos: "",
    matCarrera: ""
  });

  const manejadorDeTextos = (campo, valor) => {
    setMateria({ ...materia, [campo]: valor });
  };

  const agregarMateria = async () => {
    if(Object.values(materia).some(campo => campo === "")) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await conexion.collection("tblMaterias").add({
        ...materia,
        matCreditos: Number(materia.matCreditos)
      });
      
      alert("Materia registrada exitosamente");
      setMateria({
        matClave: "",
        matDescripcion: "",
        matPlan: "",
        matCreditos: "",
        matCarrera: ""
      });
      props.navigation.goBack();
    } catch(err) {
      alert("Error al guardar: " + err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formGroup}>
        <TextInput 
          style={styles.input}
          placeholder="Clave de materia"
          value={materia.matClave}
          onChangeText={(Value) => manejadorDeTextos("matClave", Value)}
        />
        <TextInput 
          style={styles.input}
          placeholder="Descripción"
          value={materia.matDescripcion}
          onChangeText={(Value) => manejadorDeTextos("matDescripcion", Value)}
        />
        <TextInput 
          style={styles.input}
          placeholder="Plan de estudios"
          value={materia.matPlan}
          onChangeText={(Value) => manejadorDeTextos("matPlan", Value)}
        />
        <TextInput 
          style={styles.input}
          placeholder="Créditos"
          value={materia.matCreditos}
          onChangeText={(Value) => manejadorDeTextos("matCreditos", Value)}
          keyboardType="numeric"
        />
        <TextInput 
          style={styles.input}
          placeholder="Carrera"
          value={materia.matCarrera}
          onChangeText={(Value) => manejadorDeTextos("matCarrera", Value)}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={agregarMateria}
      >
        <Text style={styles.buttonText}>Guardar Materia</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VisAltaMaterias;