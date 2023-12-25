import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import axios from "axios";
export default function App() {
  const [data, setData] = useState(undefined);

  const [password, onChangePassword] = useState(undefined);
  const [code, onChangeCode] = useState(undefined);

  useEffect(() => {
    setData(undefined);
  }, []);
  const emptyTheField = () => {
    onChangePassword(undefined);
    onChangeCode(undefined);
  };
  const fetchAPI = async () => {
    const url = `http://192.168.1.5:5005/api/allUser`;
    await axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  const passwordGenerateAPI = async () => {
    const url = `http://192.168.1.5:5005/api/passwordAuthentication`;
    await axios
      .post(url, { password: password, auth_code: code })
      .then((response) => {
        setData(response.data);
        emptyTheField();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const OnSubmitHandler = () => {
    if (password === undefined || code === undefined) return;
    passwordGenerateAPI();
  };
  return (
    <View style={styles.container}>
      <Text>Password Generate</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeCode}
        value={code}
        placeholder="One time code"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Create your Password"
        keyboardType="alphanumeric"
      />
      <Button onPress={OnSubmitHandler} title="Generate Password" />
      {data && <Text>{data?.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    paddingTop: 10,
  },
  input: {
    borderRadius: 5,
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 6,
  },
});
