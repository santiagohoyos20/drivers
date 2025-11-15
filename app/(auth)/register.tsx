import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useUser } from "../../hooks/useUser";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const { register } = useUser();

  const handleSubmit = async () => {
    await register({
      email,
      password,
      firstName,
      lastName,
      phone,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Platform.OS !== "web" ? Keyboard.dismiss : undefined}>
      <View style={styles.container}>

        <View style={{ height: 40 }} />

        <Text style={styles.title}>
          Register an Account
        </Text>

        <View style={{ height: 30 }} />

        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.button} onPress={handleSubmit}>
          Register
        </Text>

        <View style={{ height: 100 }} />

        <Link href="/login" replace>
          <Text style={{ textAlign: "center", color: "#007AFF" }}>
            Login instead
          </Text>
        </Link>

      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30
  },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 16
  },
  button: {
    backgroundColor: "#333",
    color: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    textAlign: "center"
  }
});
