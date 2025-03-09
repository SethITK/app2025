import { StyleSheet, Text, View, ScrollView, TextInput,TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";

const VisModificarAlumno = (props) => {
  const [alumno, setAlumno] = useState({
    aluNC: "",
    aluNombre: "",
    aluCorreo: "",
    aluTel: "",
  });

  const manejadorDeTextos = (campo, valor) => {
    setAlumno({ ...alumno, [campo]: valor });
  };

  const seleccionarCarrera = (campo, valor) => {
    setCarrera({ ...carrera, [campo]: valor });
  };

  const [carrera, setCarrera]=useState({
    aluCarrera: props.route.params.parCarrera
  })

  useEffect(() => {
    obtenerAlumnoPorId(props.route.params.parId);
  },[]);

  const obtenerAlumnoPorId = async (Id) => {
    try {
      await conexion
        .collection("tblAlumnos")
        .doc(Id)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setAlumno({
              aluNC: documentSnapshot.data().aluNC,
              aluNombre: documentSnapshot.data().aluNombre,
              aluCorreo: documentSnapshot.data().aluCorreo,
              aluTel: documentSnapshot.data().aluTel,
            });
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };

  const actualizarAlumno = async (Id) => {
    try {
      await conexion
        .collection("tblAlumnos")
        .doc(Id)
        .update({
          aluNC: alumno.aluNC,
          aluNombre: alumno.aluNombre,
          aluCorreo: alumno.aluCorreo,
          aluTel: alumno.aluTel,
        })
        .then(() => {
          alert("¡Alumn actualizado correctamente!");
          props.navigation.navigate("VAlumnos");
        });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Numero de control"
          value={alumno.aluNC}
          onChangeText={(Value) => manejadorDeTextos("aluNC", Value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre Del alumno"
          value={alumno.aluNombre}
          onChangeText={(Value) => manejadorDeTextos("aluNombre", Value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo Electronico"
          value={alumno.aluCorreo}
          onChangeText={(Value) => manejadorDeTextos("aluCorreo", Value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefono"
          value={alumno.aluTel}
          onChangeText={(Value) => manejadorDeTextos("aluTel", Value)}
        />
      </View>
      <View style={styles.dropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={datos}
            search
            maxHeight={400}
            labelField="label"
            placeholder={carrera.aluCarrera}
            searchPlaceholder="Search..."
            onChange={(item) => seleccionarCarrera("aluCarrera", item.label)}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
          />
        </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => actualizarAlumno()}
      >
        <Text style={styles.saveButtonText}>Actualizar Alumno</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VisModificarAlumno;

const styles = StyleSheet.create({});
