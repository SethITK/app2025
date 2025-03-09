import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListItem, Avatar } from 'react-native-elements';

const VisListaAlumnos = (props) => {
  const [alumnos, setAlumnos] = useState([]);

  const mostrarAlumnos = async () => {
    try {
      const rsAlumnos = [];
      const snapshot = await conexion.collection('tblAlumnos').get();
      snapshot.forEach((doc) => {
        const { aluNC, aluNombre,aluCarrera, aluCorreo, aluTel, aluSexo,aluFNac } = doc.data();
        rsAlumnos.push({
          id: doc.id,
          aluNC,
          aluNombre,
          aluCarrera,
          aluCorreo,
          aluTel,
          aluSexo,
          aluFNac,
        });
      });
      setAlumnos(rsAlumnos);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    mostrarAlumnos();
  }, []);

  return (
    <ScrollView>
      <Button
        title="Registrar Alumno"
        onPress={() => props.navigation.navigate("VAAlumno")}
      />
      {alumnos.map((alumno) => (
        <ListItem
          key={alumno.id}
          bottomDivider
          onPress={() => props.navigation.navigate("VEAlumno", {
            parId: alumno.id,
            parFNac: alumno.AluFNac,
            parCarrera: alumno.aluCarrera,
            parSexo: alumno.aluSexo,
          })}
        >
          <ListItem.Chevron />
          <Avatar
            rounded
            title="A"
            size="large"
            source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
          />
          <ListItem.Content>
            <Text style={styles.title}>{alumno.aluNC}</Text>
            <Text style={styles.subtitle}>{alumno.aluNombre}</Text>
            <Text style={styles.text}>{alumno.aluCorreo}</Text>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default VisListaAlumnos;

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: 'gray' },
  text: { fontSize: 14 },
});
