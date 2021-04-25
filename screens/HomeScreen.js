import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { ListItem,Icon } from 'react-native-elements';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import MyHeader from "../components/MyHeader"

export default class ExchangeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      itemDescription: '',
      itemList: [],
    };
    this.itemRef = null;
  }
  getItemsList = () => {
    this.itemRef = db.collection('Requested_items').onSnapshot((snapshot) => {
      var itemList = snapshot.docs.map((doc) => doc.data());
      this.setState({
        itemList: itemList,
      });
    });
  };

  componentDidMount() {
    this.getItemsList();
  }

  componentWillUnmount() {
    this.itemRef();
  }

  renderItem = ({ item, i }) => {
    return (
      <View
        style={{
          borderWidth: 3,
          width: 300,
          margin: 10,
          borderColor: 'pink',
          borderRadius: 10,
        }}>
        <Text>{item.itemName}</Text>
        <Text>{item.itemDescription}</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'yellow',
            backgroundColor: '#f4c2c2',
          }}
          onPress={() => {
            this.props.navigation.navigate('GetAssignmentsDetails');
          }}>
          <Text>View</Text>
        </TouchableOpacity>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.mainContainer}>
        <SafeAreaProvider>
          <Header
          leftComponent={
            <Icon
              name="bars"
              type="font-awesome"
              color="#696969"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          }
          centerComponent={{
            text: "Home Screen",
            style: { color: '#90A5A9', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#eaf8fe"
        />
        </SafeAreaProvider>
        {this.state.itemList.length === 0 ? (
          <View>
            <Text>No items</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <FlatList
              style={{ alignSelf: 'flex-start', alignContent: 'flex-start' }}
              keyExtractor={this.keyExtractor}
              data={this.state.itemList}
              renderItem={this.renderItem}
            />
          </View>
        )}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-start',
    marginTop: 50,
    marginBottom: 50,
    width: '100%',
  },
  title: {
    fontSize: 50,
    fontStyle: 'bold',
  },
  mainContainer: {
    backgroundColor: 'white',
  },
});
