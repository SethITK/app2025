import { Alert, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

const VisModificarMaterias = (props) => {
  const [materia, setMateria] = useState({
    matClave: "",
    matDescripcion: "",
    matPlan: "",
    matCreditos: "",
    matCarrera: "",
  });

  const manejadorDeTextos = (campo, valor) => {
    setMateria({ ...materia, [campo]: valor });
  };

  useEffect(() => {
    obtenerMateriaPorId(props.route.params.parId);
  }, []);

  const obtenerMateriaPorId = async (Id) => {
    try {
      const documentSnapshot = await conexion
        .collection("tblMaterias")
        .doc(Id)
        .get();
        
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        setMateria({
          matClave: data.matClave,
          matDescripcion: data.matDescripcion,
          matPlan: data.matPlan,
          matCreditos: data.matCreditos,
          matCarrera: data.matCarrera,
        });
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const actualizarMateria = async () => {
    try {
      await conexion
        .collection("tblMaterias")
        .doc(props.route.params.parId)
        .update({
          matClave: materia.matClave,
          matDescripcion: materia.matDescripcion,
          matPlan: materia.matPlan,
          matCreditos: materia.matCreditos,
          matCarrera: materia.matCarrera,
        })
        .then(() => {
          alert("¡Materia actualizada correctamente!")
          props.navigation.goBack();
        });
    } catch (err) {
      alert(err.message);
    }
  };

  const confirmarEliminar = (Id) => {
    Alert.alert("Eliminando materia", "¿Estás seguro que deseas eliminar?", [
      { text: "Sí", onPress: () => eliminarMateria(Id) },
      { text: "No", onPress: () => alert("Operación cancelada") },
    ]);
  };

  const eliminarMateria = async (Id) => {
    try {
      await conexion
        .collection("tblMaterias")
        .doc(Id)
        .delete()
        .then(() => {
          alert("Materia eliminada correctamente");
          props.navigation.goBack();
        });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputGroup}>
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
            placeholder="Plan"
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
          style={styles.saveButton}
          onPress={actualizarMateria}
        >
          <Text style={styles.buttonText}>Actualizar Materia</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmarEliminar(props.route.params.parId)}
        >
          <Text style={styles.buttonText}>Eliminar Materia</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default VisModificarMaterias;