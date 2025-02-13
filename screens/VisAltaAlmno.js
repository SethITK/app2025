import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react';

const VisAltaAlmno = (props) => {
    const [alumno, setAlumno]=useState({
        aluNC:'',
        aluNombre:'',
        aluCorreo:'',
        aluTel:'',
    });
    const manejadorDeTextos=(campo,valor)=>{
        setAlumno({...alumno,[campo]:valor})
    };
    const agregarAlumno= async()=>{
      if (alumno.aluNC==='' || alumno.aluNombre===''){
        alert("favor de llenar todos los datos")
      }else{
        try{
        await conexion.collection('tblAlumnos')
        .add({
          aluNC:alumno.aluNC,
          aluNombre:alumno.aluNombre,
          aluCorreo:alumno.aluCorreo,
          aluTel:alumno.aluTel,
        })
        alert("Alumno agregado")
        props.navigation.navigate('VLA')
      }catch(err){
        alert(err.message);
      }
      }
    }
  return (
    <ScrollView>
      <View>
        <TextInput
        placeholder='Numero de control'
        onChangeText={(Value) => manejadorDeTextos('aluNC', Value)}
        />
        <TextInput
        placeholder='Nombre Del alumno'
        onChangeText={(Value) => manejadorDeTextos('aluNombre', Value)}
        />
        <TextInput
        placeholder='Correo Electronico'
        onChangeText={(Value) => manejadorDeTextos('aluCorreo', Value)}
        />
        <TextInput
        placeholder='Telefono'
        onChangeText={(Value) => manejadorDeTextos('aluTel', Value)}
        />
        <TouchableOpacity style={{width:'90%'}} onPress={()=>agregarAlumno()}>
          <Text>Guardar Alumno</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default VisAltaAlmno

const styles = StyleSheet.create({})