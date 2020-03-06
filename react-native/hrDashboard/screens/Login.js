import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text
} from "react-native";

class Login extends Component {
  state = {
    username: "admin",
    password: "admin"
  };

  componentDidUpdate(prevProps) {
    const { navigation, auth } = this.props;
    if (auth.success && auth.success !== prevProps.success) {
      navigation.navigate("employeeList");
    }
  }

  onPressLogin = () => {
    const { login } = this.props;
    login(this.state);
  };

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
        {!!this.props.auth.message && (
          <Text style={styles.errorMessage}>{this.props.auth.message}</Text>
        )}
        <TouchableOpacity style={styles.loginBtn} onPress={this.onPressLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Login.navigationOptions = {
  header: null
};

Login.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired
};

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
  },
  errorMessage: {
    color: "red"
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: body =>
      dispatch({
        type: "LOGIN",
        body
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
