import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { connect } from "react-redux";

class EmployeeList extends Component {
  componentDidMount() {
    const { getEmployeeList } = this.props;
    getEmployeeList();
  }

  onPressEmployee = item => {
    const { navigation, getEmployeeDetails } = this.props;
    getEmployeeDetails(item.id);
    navigation.navigate("employeeDetails");
  };

  renderEmployee = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => this.onPressEmployee(item)}>
          <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.employee.employeeList}
          renderItem={this.renderEmployee}
        />
      </View>
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
  item: {
    textAlign: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#fff",
    fontSize: 18,
    height: 44,
    width: 300,
    backgroundColor: "#3ab678"
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
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
