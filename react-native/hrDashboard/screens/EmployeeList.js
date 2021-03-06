import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { Container, Header, Left, Body, Button, Right } from "native-base";
import { connect } from "react-redux";
import { StatusBarHeight } from "../utils/statusBar.utils";

class EmployeeList extends Component {
  componentDidMount() {
    const { getEmployeeList } = this.props;
    getEmployeeList();
  }

  onPressEmployee = item => {
    const { getEmployeeDetails } = this.props;
    getEmployeeDetails(item.id);
  };

  onPressCreate = () => {
    const { navigation, clearState } = this.props;
    clearState();
    navigation.navigate("employeeSubmit");
  };

  renderEmployee = ({ item }) => {
    return (
      <View style={styles.itemView}>
        <TouchableOpacity onPress={() => this.onPressEmployee(item)}>
          <Text style={styles.itemName}>{`${item.name}`}</Text>
          <Text style={styles.item}>{`#${item.id} --- ${item.position}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container style={{ marginTop: StatusBarHeight }}>
        <Header>
          <Left></Left>
          <Body>
            <Text style={styles.title}>List of Employees</Text>
          </Body>
          <Right>
            <Button onPress={() => navigation.goBack()} transparent>
              <Text style={styles.logout}>Logout</Text>
            </Button>
          </Right>
        </Header>
        <View style={styles.container}>
          <FlatList
            data={this.props.employee.employeeList}
            renderItem={this.renderEmployee}
            style={styles.flatList}
          />
          <TouchableOpacity
            onPress={this.onPressCreate}
            style={styles.createNewEmployee}
          >
            <Text style={styles.buttonText}>Register new employee</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

EmployeeList.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30
  },
  flatList: {
    width: "90%"
  },
  itemName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 5
  },
  item: {
    textAlign: "center",
    fontSize: 18,
    padding: 5
  },
  itemView: {
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#3ab678",
    borderRadius: 10
  },
  createNewEmployee: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  logout: {
    fontSize: 18,
    color: "white"
  },
  buttonText: {
    color: "white"
  },
  title: {
    fontSize: 18,
    color: "white"
  }
});

const mapStateToProps = state => {
  return {
    employee: state.employee
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEmployeeList: () =>
      dispatch({
        type: "GET_EMPLOYEE_LIST"
      }),
    getEmployeeDetails: employeeId =>
      dispatch({
        type: "GET_EMPLOYEE_DETAILS",
        employeeId
      }),
    clearState: () =>
      dispatch({
        type: "RESET_EMPLOYEE_STATE"
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
