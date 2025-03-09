import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const VisModificarAlumno = (props) => {
  const [alumno, setAlumno] = useState({
    aluNC: "",
    aluNombre: "",
    aluCorreo: "",
    aluTel: "",
    aluFNac: "",
    aluSexo: "Femenino",
  });

  const [carrera, setCarrera] = useState({
    aluCarrera: props.route.params.parCarrera,
  });

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [sexo, setSexo] = useState("Femenino");

  const datos = [
    { label: "Ingenieria en Sistemas", value: "1" },
    { label: "Ingenieria en Electromecanica", value: "2" },
    { label: "Ingenieria en Gestion", value: "3" },
    { label: "Turismo", value: "4" },
    { label: "Arquitectura", value: "5" },
    { label: "Gastronomia", value: "6" },
  ];

  const manejadorDeTextos = (campo, valor) => {
    setAlumno({ ...alumno, [campo]: valor });
  };

  const seleccionarCarrera = (campo, valor) => {
    setCarrera({ ...carrera, [campo]: valor });
  };

  const seleccionarSexo = (valor) => {
    setSexo(valor);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };


  useEffect(() => {
    obtenerAlumnoPorId(props.route.params.parId);
  }, []);

  const obtenerAlumnoPorId = async (Id) => {
    try {
      const documentSnapshot = await conexion
        .collection("tblAlumnos")
        .doc(Id)
        .get();
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        setAlumno({
          aluNC: data.aluNC,
          aluNombre: data.aluNombre,
          aluCorreo: data.aluCorreo,
          aluTel: data.aluTel,
          aluFNac: data.aluFNac,
        });
        setCarrera({ aluCarrera: data.aluCarrera });
        setSexo(data.aluSexo);
        setDate( (data.aluFNac));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const actualizarAlumno = async () => {
    try {
      await conexion
        .collection("tblAlumnos")
        .doc(props.route.params.parId)
        .update({
          aluNC: alumno.aluNC,
          aluNombre: alumno.aluNombre,
          aluCorreo: alumno.aluCorreo,
          aluTel: alumno.aluTel,
          aluCarrera: carrera.aluCarrera,
          aluFNac: date.toLocaleString([], { dateStyle: "medium" }),
          aluSexo: sexo,
        })
        .then(() => {
          alert("¡Alumno actualizado correctamente!");
          props.navigation.goBack();
        });
    } catch (err) {
      alert(err.message);
    }
  };
  const confirmarEliminar=(Id)=>{
    Alert.alert('Eliminando alumno','¿Estas seguro que desea eliminar?',
      [
        {text:'si',onPress:()=>
          eliminarAlumno(Id)
        },
        {
          text:'no',onPress:()=>alert("Operacion cancelada")
        }
      ]
    )
  }

  const eliminarAlumno=async(Id)=>{
    try{
      await conexion
      .collection('tblAlumnos')
      .doc(Id)
      .delete()
      .then(()=>{
        alert("alumno eliminado")
        props.navigation.goBack();
      })
    }catch(err){
      alert(err.message)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Número de control"
            value={alumno.aluNC}
            onChangeText={(Value) => manejadorDeTextos("aluNC", Value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre del alumno"
            value={alumno.aluNombre}
            onChangeText={(Value) => manejadorDeTextos("aluNombre", Value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={alumno.aluCorreo}
            onChangeText={(Value) => manejadorDeTextos("aluCorreo", Value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
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
            valueField="value"
            placeholder={carrera.aluCarrera}
            searchPlaceholder="Buscar..."
            value={carrera.aluCarrera}
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
        <SafeAreaView>
          <View style={styles.datePickerContainer}>
            <Button onPress={showDatepicker} title="Fecha de nacimiento..." />
          </View>
          <Text style={styles.fecha}>
            Fecha: {date.toLocaleString([], { dateStyle: "medium" })}
          </Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </SafeAreaView>
        <View style={styles.radioButtonContainer}>
          <Text>Seleccione el sexo:</Text>
          <RadioButtonGroup
            selected={sexo}
            onSelected={(value) => seleccionarSexo(value)}
            containerStyle={styles.radioGroup}
          >
            <RadioButtonItem value="Femenino" label={<Text>Femenino</Text>} />
            <RadioButtonItem value="Masculino" label={<Text>Masculino</Text>} />
          </RadioButtonGroup>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={actualizarAlumno}
        >
          <Text style={styles.saveButtonText}>Actualizar Alumno</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={()=>confirmarEliminar(props.route.params.parId)}
        >
          <Text style={styles.saveButtonText}>Eliminar Alumno</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VisModificarAlumno;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "black",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "black",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  fecha: {
    fontSize: 16,
    marginBottom: 20,
  },
  radioButtonContainer: {
    marginBottom: 20,
  },
  radioGroup: {
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButton: {
    marginTop:3,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
});