import { StyleSheet,Text,View,ScrollView,TextInput,TouchableOpacity,SafeAreaView,Button} from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

const VisAltaAlmno = (props) => {
  const [alumno, setAlumno] = useState({
    aluNC: "",
    aluNombre: "",
    aluCorreo: "",
    aluTel: "",
    aluFNac: "",
    aluSexo: "Femenino",
  });

  const [sexo, setSexo] = useState("Femenino");
  const [carrera, setCarrera] = useState({
    aluCarrera: "Seleccione una carrera...",
  });

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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

  const agregarAlumno = async () => {
    if (alumno.aluNC === "" || alumno.aluNombre === "") {
      alert("Favor de llenar todos los datos");
    } else {
      try {
        await conexion.collection("tblAlumnos").add({
          aluNC: alumno.aluNC,
          aluNombre: alumno.aluNombre,
          aluCorreo: alumno.aluCorreo,
          aluTel: alumno.aluTel,
          aluCarrera: carrera.aluCarrera,
          aluFNac: date.toLocaleString([], { dateStyle: "medium" }),
          aluSexo: sexo,
        });
        alert("Alumno agregado");
        props.navigation.goBack();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Numero de control"
            onChangeText={(Value) => manejadorDeTextos("aluNC", Value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre Del alumno"
            onChangeText={(Value) => manejadorDeTextos("aluNombre", Value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electronico"
            onChangeText={(Value) => manejadorDeTextos("aluCorreo", Value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefono"
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
          onPress={() => agregarAlumno()}
        >
          <Text style={styles.saveButtonText}>Guardar Alumno</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VisAltaAlmno;

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
    backgroundColor: "blue",
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "white",
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
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
});
