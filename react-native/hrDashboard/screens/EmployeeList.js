import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Button,
  Title,
  Right
} from "native-base";
import { connect } from "react-redux";

class EmployeeList extends Component {
  componentDidMount() {
    const { getEmployeeList } = this.props;
    console.log(this.props.employee);
    getEmployeeList();
  }

  onPressEmployee = item => {
    const { navigation, getEmployeeDetails, clearState } = this.props;
    getEmployeeDetails(item.id);
    clearState();
    navigation.navigate("employeeDetails");
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
          <Text style={styles.item}>{`Name: ${item.name}`}</Text>
          <Text style={styles.item}>{`Id: ${item.id}`}</Text>
          <Text style={styles.item}>{`Position: ${item.position}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body>
            <Title>List of Employees</Title>
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
            <Text>Register new employee</Text>
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
  item: {
    textAlign: "center",
    fontSize: 18,
    height: 44,
    padding: 5,
    backgroundColor: "#3ab678"
  },
  itemView: {
    borderWidth: 2,
    borderColor: "#fff"
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
