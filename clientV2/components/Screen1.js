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

import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
function Screen1({ submitForm, dosarText, name }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          title="Go to Screen2 => candidat "
          onPress={() => {
            navigation.navigate("Screen2");
          }}
        ></Button>

        <Button
          title="Go to Screen3 => admin "
          onPress={() => {
            navigation.navigate("Screen3");
          }}
        ></Button>

        <Text>SHOW Dosare:</Text>
        {dosarText}
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
export default Screen1;
