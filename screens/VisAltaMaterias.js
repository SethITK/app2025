import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'

const VisAltaMaterias = () => {
  const [materia, setMateria] = useState({
    matClave:"",
    matDescripcion:"",
    matPlan:"",
    matCreditos:"",
    matCarrera:""
  })

  const manejadorDeTextos = (campo, valor) => {
    setMateria({ ...materia, [campo]: valor });
  };

  const agregarMateria = async () => {
  if(materia.matClave === "" || materia.matDescripcion === "" || materia.matPlan === "" || materia.matCreditos === "" || materia.matCarrera === ""){
    alert("Favor de llenar todos los datos");
  }else{
    try {
      await conexion.collection("tblMaterias").add({
        matClave: materia.matClave,
        matDescripcion: materia.matDescripcion,
        matPlan: materia.matPlan,
        matCreditos: materia.matCreditos,
        matCarrera: materia.matCarrera
      });
      alert("Materia agregada");
      props.navigation.goBack();
    }catch(err){
      alert(err.message);
    }
  }
  };

  return (
    <ScrollView>
      <View>
        <View>
          <TextInput 
          placeholder='Clave de materia'
          onChangeText={(Value) => manejadorDeTextos("matClave", Value)}
          />
          <TextInput 
          placeholder='descripcion'
          onChangeText={(Value) => manejadorDeTextos("matDescripcion", Value)}
          />
          <TextInput 
          placeholder='Plan'
          onChangeText={(Value) => manejadorDeTextos("matPlan", Value)}
          />
          <TextInput 
          placeholder='Creditos'
          onChangeText={(Value) => manejadorDeTextos("matCreditos", Value)}
          />
          <TextInput 
          placeholder='Carrera'
          onChangeText={(Value) => manejadorDeTextos("matCarrera", Value)}
          />
        </View>
        <TouchableOpacity
        onPress={() => agregarMateria()}>
          <Text>Agregar materia</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default VisAltaMaterias

const styles = StyleSheet.create({})