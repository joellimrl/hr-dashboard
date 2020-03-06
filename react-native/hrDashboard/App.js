import React, { Component } from "react";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store/store";
import LoginScreen from "./screens/Login";
import EmployeeList from "./screens/EmployeeList";
import EmployeeDetails from "./screens/EmployeeDetails";
import { helloSaga } from "./sagas";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            initialRouteName="login"
          >
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="employeeList" component={EmployeeList} />
            <Stack.Screen name="employeeDetails" component={EmployeeDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
