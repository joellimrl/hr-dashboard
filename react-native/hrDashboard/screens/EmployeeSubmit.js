import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Toast,
  Left,
  Body,
  Button,
  Icon
} from "native-base";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";

class EmployeeSubmit extends Component {
  state = {
    name: "boink",
    id: "",
    position: "Bob",
    startDate: "2/2/2",
    terminationDate: "",
    department: "something",
    dob: "2/2/2",
    address: "",
    mobileNumber: "1234",
    email: "bla@bla.com",
    gender: "M"
  };

  componentDidUpdate() {
    const { employee, navigation, clearState, getEmployeeList } = this.props;
    if (employee.success) {
      clearState();
      getEmployeeList();
      navigation.navigate("employeeList");
    }
  }

  onPressSubmit = () => {
    const { submitEmployeeDetails } = this.props;
    if (
      this.state.name &&
      this.state.id &&
      this.state.position &&
      this.state.startDate &&
      this.state.department &&
      this.state.dob &&
      this.state.mobileNumber &&
      this.state.email &&
      this.state.gender
    )
      submitEmployeeDetails(this.state);
    else {
      Toast.show({
        text: "Please fill in all required fields!",
        type: "warning"
      });
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => navigation.goBack()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={styles.title}>Register an Employee</Text>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <Form style={styles.formStyle}>
            <Item stackedLabel>
              <Label>Name of Employee</Label>
              <Input
                ref={this.searchInput}
                onChangeText={text => this.setState({ name: text })}
              />
            </Item>
            <Item stackedLabel>
              <Label>Employee ID</Label>
              <Input onChangeText={text => this.setState({ id: text })} />
            </Item>
            <Item stackedLabel>
              <Label>Position</Label>
              <Input onChangeText={text => this.setState({ position: text })} />
            </Item>
            <Item stackedLabel>
              <Label>Date of Birth</Label>
              <Input onChangeText={text => this.setState({ dob: text })} />
            </Item>
            <Item stackedLabel>
              <Label>Gender</Label>
              <Input onChangeText={text => this.setState({ gender: text })} />
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input onChangeText={text => this.setState({ email: text })} />
            </Item>
            <Item stackedLabel>
              <Label>Date of commencement</Label>
              <Input
                onChangeText={text => this.setState({ startDate: text })}
              />
            </Item>
            <Item stackedLabel>
              <Label>Date of termination (Optional)</Label>
              <Input
                onChangeText={text => this.setState({ terminationDate: text })}
              />
            </Item>
            <Item stackedLabel>
              <Label>Department</Label>
              <Input
                onChangeText={text => this.setState({ department: text })}
              />
            </Item>
            <Item stackedLabel>
              <Label>Address (Optional)</Label>
              <Input onChangeText={text => this.setState({ address: text })} />
            </Item>
            <Item stackedLabel last>
              <Label>Mobile number</Label>
              <Input
                onChangeText={text => this.setState({ mobileNumber: text })}
              />
            </Item>
          </Form>
          <TouchableOpacity
            onPress={this.onPressSubmit}
            style={styles.submitButton}
          >
            <Text>SUBMIT</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

EmployeeSubmit.propTypes = {
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
  formStyle: {
    flex: 1,
    width: "90%"
  },
  submitButton: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
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
    submitEmployeeDetails: body =>
      dispatch({
        type: "POST_EMPLOYEE",
        body
      }),
    clearState: () =>
      dispatch({
        type: "RESET_EMPLOYEE_STATE"
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeSubmit);
