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

function Screen2({ submitForm, name }) {
  const navigation = useNavigation();

  const [nume, setNume] = useState("");
  const [medie1, setMedie1] = useState("");
  const [medie2, setMedie2] = useState("");
  const [status, setStatus] = useState("");

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
          <Text>Screen2 Candidat </Text>

          <Button
            title="Go to Screen 1 => statistica"
            onPress={() => navigation.navigate("Screen1")}
          ></Button>

          <Button
            title="Go to Screen 3 => Admin"
            onPress={() => navigation.navigate("Screen3")}
          ></Button>

          <View>
            <TextInput
              style={styles.formInput1}
              placeholder="nume"
              onChangeText={setNume}
            ></TextInput>

            <TextInput
              style={styles.formInput}
              placeholder="Medie1"
              onChangeText={setMedie1}
            ></TextInput>

            <TextInput
              style={styles.formInput}
              placeholder="Medie2"
              onChangeText={setMedie2}
            ></TextInput>

            <TextInput
              style={styles.formInput}
              placeholder="Status"
              onChangeText={setStatus}
            ></TextInput>
            <Button
              title="ADAUGA Dosar"
              onPress={() => {
                submitForm(nume, medie1, medie2, status);
                createAlertAdd();
              }}
            ></Button>
          </View>

          {/* {productsFilter} */}
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

export default Screen2;
