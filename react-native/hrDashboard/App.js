import React, { Component } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store/store";
import LoginScreen from "./screens/Login";
import EmployeeList from "./screens/EmployeeList";
import EmployeeDetails from "./screens/EmployeeDetails";
import EmployeeSubmit from "./screens/EmployeeSubmit";
import { Root } from "native-base";

const Stack = createStackNavigator();

export default class App extends Component {
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
