import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "react-native-elements";

const VisListaMaterias = (props) => {
  const [materias, setMaterias] = useState([]);
  const mostrarMaterias = async () => {
    try {
      const rsMaterias = [];
      const snapshot = await conexion.collection('tblMaterias').get();
      snapshot.forEach((doc) => {
        const { matClave, matDescripcion,matPlan,matCreditos,matCarrera} = doc.data();
        rsMaterias.push({
          id: doc.id,
          matClave,
          matDescripcion,
          matPlan,
          matCreditos,
          matCarrera,
        });
      })
      setMaterias(rsMaterias)
    }
    catch(err){
      alert(err.message)
    }
  };
  useEffect(()=> {
    const refresh = props.navigation.addListener('focus', async()=>{
      mostrarMaterias();

    },[]);
    return refresh;
  },[props]);
  
  return (
    <ScrollView>
      <Button
        title="Registrar Materia"
        onPress={() => props.navigation.navigate("VAMateria")}
      />
      {materias.map((materia) =>(
        <ListItem
        key={materia.id}
        bottomDivider
        onPress={()=> props.navigation.navigate("VEMateria",{
          parId: materia.id,
        })}
        >
          <ListItem.Chevron/>
          <Avatar
          rounded
          title="A"
          size="large"
          source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
          />
          <ListItem.Content>
            <Text>{materia.matClave}</Text>
            <Text>{materia.matCarrera}</Text>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default VisListaMaterias;

const styles = StyleSheet.create({});
