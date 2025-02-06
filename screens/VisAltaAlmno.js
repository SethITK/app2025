import { StyleSheet, Text, View, ScrollView,TextInput } from 'react-native'
import React,{useState} from 'react'

const VisAltaAlmno = (props) => {
    const [alumno, setAlumno]=useState({
        aluNC:'',
        aluNombre:'',
        aluCorreo:'',
        aluTel:'',
    })
    const manejadorDeTextos=(campo,valor)=>{
        setAlumno({...alumno,[campo]:valor})
    }
  return (
    <ScrollView>
      <View>
        <TextInput
        placeholder='Numero de control'
        onChangeText={(Value) => manejadorDeTextos('aluNC', Value)}
        />
      </View>
    </ScrollView>
  )
}

export default VisAltaAlmno

const styles = StyleSheet.create({})