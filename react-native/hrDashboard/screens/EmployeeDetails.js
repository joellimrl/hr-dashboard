import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { Container, Header, Left, Body, Button, Icon } from "native-base";
import { connect } from "react-redux";
import { StatusBarHeight } from "../utils/statusBar.utils";

class EmployeeDetails extends Component {
  renderDetails = employeeDetails => {
    return (
      <View style={styles.view}>
        <View style={styles.column}>
          <View style={styles.item}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{employeeDetails.name}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Employee ID</Text>
            <Text style={styles.value}>{employeeDetails.id}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Position</Text>
            <Text style={styles.value}>{employeeDetails.position}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.value}>{employeeDetails.dob}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{employeeDetails.gender}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.item}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{employeeDetails.email}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Date of Commencement</Text>
            <Text style={styles.value}>{employeeDetails.startDate}</Text>
          </View>
          {!!employeeDetails.terminationDate && (
            <View style={styles.item}>
              <Text style={styles.label}>Date of Termination</Text>
              <Text style={styles.value}>
                {employeeDetails.terminationDate}
              </Text>
            </View>
          )}
          <View style={styles.item}>
            <Text style={styles.label}>Department</Text>
            <Text style={styles.value}>{employeeDetails.department}</Text>
          </View>
          {!!employeeDetails.terminationDate && (
            <View style={styles.item}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{employeeDetails.address}</Text>
            </View>
          )}
          <View style={styles.item}>
            <Text style={styles.label}>Mobile number</Text>
            <Text style={styles.value}>{employeeDetails.mobileNumber}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { navigation, employee } = this.props;
    return (
      <Container style={{ marginTop: StatusBarHeight }}>
        <Header>
          <Left>
            <Button onPress={() => navigation.goBack()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>Employee Details</Text>
          </Body>
        </Header>
        <View style={styles.container}>
          {this.renderDetails(employee.employeeDetails)}
        </View>
      </Container>
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
  view: {
    width: "90%",
    height: "90%",
    padding: 10,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  column: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  item: {
    padding: 10
  },
  label: {
    color: "#919189",
    fontSize: 12
  },
  value: {
    padding: 5,
    fontSize: 15
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

export default connect(mapStateToProps)(EmployeeDetails);
