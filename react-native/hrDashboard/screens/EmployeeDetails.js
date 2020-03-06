import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class EmployeeDetails extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.item}>
          {JSON.stringify(this.props.employee.employeeDetails)}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text>GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

EmployeeDetails.propTypes = {
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
    padding: 10,
    fontSize: 18,
    height: 44
  },
  backButton: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  }
});

const mapStateToProps = state => {
  return {
    employee: state.employee
  };
};

export default connect(mapStateToProps)(EmployeeDetails);
