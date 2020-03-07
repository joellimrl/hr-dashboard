import React, { Component } from "react";
import { Provider } from "react-redux";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store/store";
import LoginScreen from "./screens/Login";
import EmployeeList from "./screens/EmployeeList";
import EmployeeDetails from "./screens/EmployeeDetails";
import EmployeeSubmit from "./screens/EmployeeSubmit";
import { Root } from "native-base";

const Stack = createStackNavigator();
const YOUR_PUSH_TOKEN = "";

export default class App extends Component {
  state = {
    notification: {}
  };

  registerForPushNotificationsAsync = async () => {
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
      console.log(token);
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
    this.setState({ notification: notification });
  };

  render() {
    return (
      <Provider store={store}>
        <Root>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
              initialRouteName="login"
            >
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="employeeList" component={EmployeeList} />
              <Stack.Screen
                name="employeeDetails"
                component={EmployeeDetails}
              />
              <Stack.Screen name="employeeSubmit" component={EmployeeSubmit} />
            </Stack.Navigator>
          </NavigationContainer>
        </Root>
      </Provider>
    );
  }
}
