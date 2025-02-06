import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { auth } from '../Control/Firebase.js'; // Asegúrate de que la ruta sea correcta
import { Fontisto } from '@expo/vector-icons';

const VisLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Escucha cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        props.navigation.navigate('Drawer'); // Navega a la pantalla "Drawer" si el usuario está autenticado
      }
    });

    // Limpia la suscripción al desmontar el componente
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleGoogleSignIn = () => {
    setGoogleSubmitting(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const { user } = result;
        console.log('Google sign-in success:', user);
        props.navigation.navigate('VMenu', {
          email: user.email,
          name: user.displayName,
          photoUrl: user.photoURL,
        });
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        console.log('Google sign-in error:', error);
        setGoogleSubmitting(false);
        alert('Error al iniciar sesión con Google. Verifica tu conexión e intenta nuevamente.');
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>

      {!googleSubmitting ? (
        <TouchableOpacity onPress={handleGoogleSignIn}>
          <Fontisto name="google" size={25} style={styles.buttonTextGoogle} />
          <Text>Sign in with Google</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="small" color="#0782F9" />
      )}
    </KeyboardAvoidingView>
  );
};

export default VisLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonTextGoogle: {
    color: 'blue',
    fontWeight: '700',
    fontSize: 20,
    alignSelf: 'center',
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});