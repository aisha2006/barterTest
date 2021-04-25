import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  Alert,
  Modal,
} from 'react-native';
import * as firebase from 'firebase';
import db from '../config';

export default class SignupLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: '',
      password: '',
      isModalVisible: false,
      confirmPassword: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      age: null,
    };
  }

  userSignin = async (username, password, confirmPassword) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then((response) => {
        Alert.alert('User Added successfully');
        this.props.navigation.navigate('AppTabNavigator');

        db.collection('Users').add({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          contact: this.state.contact,
          emailId: this.state.emailId,
          address: this.state.address,
          age: this.state.age,
        });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  userLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('CustomSideBarMenu');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };
  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.isModalVisible}>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <Text>Registration form</Text>
              <TextInput
                placeholder={'first name'}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
              />

              <TextInput
                placeholder={'last name'}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
              />

              <TextInput
                placeholder={'Contact'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
              />

              <TextInput
                placeholder={'Age'}
                maxLength={2}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({ age: text });
                }}
              />

              <TextInput
                placeholder={'Address'}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              />

              <TextInput
                placeholder={'E-mail ID'}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
              />

              <TextInput
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />

              <TextInput
                placeholder={'Confirm Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
              />

              <View>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    this.userSignin(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}>
                  <Text style={styles.registerButton}>cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View>
        {this.showModal()}
        <Image
          style={styles.tinyLogo}
          source={require('../assets/barter.jpg')}
        />

        <View>
          <TextInput
            placeholder={'abc@mail.com'}
            style={styles.email}
            onChangeText={(email) => this.setState({ email: email })}
          />
        </View>

        <View>
          <TextInput
            placeholder={'password'}
            style={styles.password}
            onChangeText={(password) => this.setState({ password: password })}
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.login}
            onPress={() => {
              this.userLogin(this.state.email, this.state.password);
            }}>
            <Text>login</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.signUp}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}>
            <Text>sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  email: {
    alignSelf: 'left',
    alignItems: 'center',
    marginTop: 150,
    marginLeft: 20,
  },

  password: {
    alignSelf: 'left',
    alignItems: 'center',
    marginTop: 1,
    marginLeft: 20,
  },

  login: {
    alignSelf: 'left',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 200,
  },

  signUp: {
    alignSelf: 'left',
    alignItems: 'center',
    marginTop: -19,
    marginRight: 200,
  },

  tinyLogo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: -100,
    marginTop: 30,
  },

  registerButtonText: {
    alignSelf: 'center',
  },

  registerButton: {
    justifyContent: 'center',
  },
});
