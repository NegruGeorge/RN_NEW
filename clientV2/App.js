import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";

import Toast from "react-native-toast-message";

import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";
import Screen3 from "./components/Screen3";

import * as SQLite from "expo-sqlite";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import axios from "axios";

const db = SQLite.openDatabase("database.db");

const Stack = createNativeStackNavigator();

export default function App() {
  const [dosare, setDosare] = useState([]);
  const [dosareDB, setDosareDb] = useState([]);

  const [productsFilter, setProductsFilter] = useState([]);

  const [dosarTextNevalid, setDosarTextNevalid] = useState([]);
  const [dosarText, setDosarText] = useState([]);
  const [produsAdaugatSesiune, setProdusAdaugatSesiune] = useState(0);

  const createAlertGetError = () => {
    Alert.alert("Error Get", "Eroare get request", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const createAlertPostError = () => {
    Alert.alert("Error Post", "Eroare post request", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const getAll = async () => {
    try {
      let res = await axios.get("http://192.168.100.6:2027/all");

      let arr = [];
      res.data.forEach((el) => {
        // verificam statusul
        if (el.status === true) {
          let mediePonderata = el.medie1 * 0.75 + el.medie2 * 0.25;
          arr.push(
            <Text>
              id:{el.id} medie: {mediePonderata}
            </Text>
          );
        }
      });
      setDosarText(arr);
      console.log("am facut GET REQUEST ");
      // console.log(res.data);
    } catch (err) {
      console.log("err GET REQUEST");
      console.log(err);
      createAlertGetError();
    }
  };

  const getAllNevalide = async () => {
    try {
      let res = await axios.get("http://192.168.100.6:2027/all");

      let arr = [];
      res.data.forEach((el) => {
        // verificam statusul
        if (el.status === false) {
          let mediePonderata = el.medie1 * 0.75 + el.medie2 * 0.25;
          arr.push(
            <Text>
              id:{el.id} medie: {mediePonderata}
            </Text>
          );
        }
      });
      setDosarTextNevalid(arr);
      console.log("am facut GET REQUEST ");
      // console.log(res.data);
    } catch (err) {
      console.log("err GET REQUEST");
      console.log(err);
      createAlertGetError();
    }
  };

  let submitForm = async (nume, medie1, medie2, status) => {
    console.log("form:" + nume + " " + medie1 + " " + medie2 + " " + status);

    try {
      let res = await axios.post("http://192.168.100.6:2027/register", {
        nume: nume,
        medie1: medie1,
        medie2: medie2,
        status: status,
      });

      console.log(res.data);
      console.log("success POST REQUEST");

      let total_Adaugate_sesiune = produsAdaugatSesiune;
      total_Adaugate_sesiune += 1;
      setProdusAdaugatSesiune(total_Adaugate_sesiune);
    } catch (err) {
      console.log("errr POST REQUEST");
      console.log(err);
      createAlertPostError();
    }
  };

  let submitFormValidate = async (id, status) => {
    console.log("formValidate:" + id + " " + status);

    try {
      let res = await axios.post("http://192.168.100.6:2027/validate", {
        id: id,
        status: status,
      });
      console.log(res.data);
      console.log("success POST REQUEST");

      let total_Adaugate_sesiune = produsAdaugatSesiune;
      total_Adaugate_sesiune += 1;
      setProdusAdaugatSesiune(total_Adaugate_sesiune);
    } catch (err) {
      console.log("errr POST REQUEST");
      console.log(err);
    }
  };

  const createTable = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table Exam" +
            "(id integer, nume text, medie1 text, medie2 text , status text)"
        );
      },
      (err) => {
        console.log(err.message);
        console.log("eroare in db");
      }
    );

    console.log("am creat DB ul");
  };

  const get_elements_from_db = () => {
    let newArr = [];
    db.transaction((tx) => {
      tx.executeSql("select * from exam", [], (_, { rows: { _array } }) => {
        _array.forEach((el) => {
          newArr = [...newArr, el];
        });

        console.log(newArr);
      });
    });
  };

  const addAsset = (item) => {
    let ok = 0;
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO EXAM (id,nume,medie1,medie2,status)  values 
          ('${item.id}','${item.nume}', '${item.medie1}', '${item.medie2}','${item.status}')
          `
        );
      },
      (error) => {
        console.log(error);
      }
    );
    console.log("item adaugat");
    // get_elements_from_db()
  };

  useEffect(() => {
    console.log(db);
    createTable();
    get_elements_from_db();
  }, []);

  useEffect(() => {
    getAll();
    getAllNevalide();
    // getProducts_with_filter();
  }, [produsAdaugatSesiune]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1">
          {(props) => (
            <Screen1
              submitForm={submitForm}
              dosarText={dosarText}
              name="Screen1"
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Screen2">
          {(props) => <Screen2 submitForm={submitForm} name="Screen2" />}
        </Stack.Screen>

        <Stack.Screen name="Screen3">
          {(props) => (
            <Screen3
              submitFormValidate={submitFormValidate}
              dosarTextNevalid={dosarTextNevalid}
              name="Screen3"
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={styles.container}>
    //   <Screen1 />
    // </View>
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
