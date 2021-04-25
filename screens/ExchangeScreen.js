import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class ExchangeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      itemDescription: '',
      userId: firebase.auth().currentUser.email,
    };
  }

  addItem = () =>
    db.collection('Requested_items').add({
      itemName: this.state.itemName,
      itemDescription: this.state.itemDescription,
      userId: this.state.userId,
    });

  render() {
    return (
      <View style={styles.mainContainer}>
        <SafeAreaProvider>
          <Header
            centerComponent={<Text>Add Item</Text>}
            containerStyle={{ backgroundColor: '#ADD8E6' }}
          />
        </SafeAreaProvider>
        <View style={styles.container}>
          <View
            style={{
              margin: 10,
              borderColor: 'pink',
              borderRadius: 10,
              borderWidth: 5,
              width:"100%"
            }}>
            <TextInput
              placeholder={'item name'}
              onChangeText={(text) => {
                this.setState({ itemName: text });
              }}
            />
          </View>
          <View
            style={{
              margin: 10,
              borderColor: 'pink',
              borderRadius: 10,
              borderWidth: 5,
              height: 100,
              width: '100%',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <TextInput
              placeholder={'description'}
              multiline="true"
              onChangeText={(text) => {
                this.setState({ itemDescription: text });
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={{
                margin:10,
                width: '100%',
                borderWidth: 4,
                borderColor: 'orange',
                backgroundColor: 'orange',
              }}
              onPress={() => this.addItem()}>
              <Text>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    margin:125,
    justifyContent:"center",
    alignContent:"center",
  },
  title: {
    fontSize: 50,
    fontStyle: 'bold',
  },
  mainContainer: {
    backgroundColor: 'white',
  },
});
