import React, { Component } from "react";
import { connect } from "react-redux";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
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
    username: "",
    password: "",
    notification: {}
  };

  onPressLogin = () => {
    const { login } = this.props;
    login(this.state);
    this.setState({ notification: {} });
  };

  registerForPushNotificationsAsync = async () => {
    const { postNotificationToken } = this.props;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      await postNotificationToken({ token });
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    this.setState({ notification });
  };

  render() {
    const {
      notification: { data }
    } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>HR Dashboard</Text>
        {!!data && (
          <View style={styles.notif}>
            <Text style={styles.notifTitle}>{data.message}</Text>
            <Text>{`${data.name} (${data.position})`}</Text>
          </View>
        )}
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
    marginBottom: 30,
    textAlign: "center"
  },
  notif: {
    padding: 10,
    marginBottom: 20,
    width: "80%",
    backgroundColor: "#fffeae",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  notifTitle: { fontWeight: "bold" },
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
      }),
    postNotificationToken: body =>
      dispatch({
        type: "POST_NOTIFICATION_TOKEN",
        body
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
