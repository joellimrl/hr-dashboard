import React, { Component } from "react";
import {
  // Platform,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";

// const instructions = Platform.select({
//   ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
//   android:
//     "Double tap R on your keyboard to reload,\n" +
//     "Shake or press menu button for dev menu"
// });

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onPressLogin = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>HR Dashboard</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ username: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 60,
    color: "#fb5b5a",
    marginBottom: 40,
    textAlign: "center"
  },
  inputText: {
    height: 50,
    color: "white"
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});
