import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function Screen3({ submitFormValidate, dosarTextNevalid, name }) {
  const navigation = useNavigation();

  const [id, setId] = useState([]);
  const [status, setStatus] = useState([]);

  const createAlertAdd = () => {
    Alert.alert("Adauga Element", "Adauga element in lista", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Text>Screen3 Admin </Text>

          <Button
            title="Go to Screen 1 => Statistica"
            onPress={() => navigation.navigate("Screen1")}
          ></Button>

          <Button
            title="Go to Screen 2 => Candidat"
            onPress={() => navigation.navigate("Screen2")}
          ></Button>

          <View>
            <TextInput
              style={styles.formInput1}
              placeholder="id dosar pt validate"
              onChangeText={setId}
            ></TextInput>

            <TextInput
              style={styles.formInput}
              placeholder="status dosar"
              onChangeText={setStatus}
            ></TextInput>

            <Button
              title="Validate Dosar"
              onPress={() => {
                submitFormValidate(id, status);
                createAlertAdd();
              }}
            ></Button>
          </View>

          <Text>SHOW Dosare:</Text>
          {dosarTextNevalid}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Screen3;
