import { StyleSheet, Text, View, ScrollView,Button } from 'react-native'
import React from 'react'

const VisListaAlumnos = (props) => {
  return (
    <ScrollView>
      <Button title='Registrar Alumno' onPress={()=>props.navigation.navigate("VAAlumno")}/>
    </ScrollView>
  )
}

export default VisListaAlumnos

const styles = StyleSheet.create({})