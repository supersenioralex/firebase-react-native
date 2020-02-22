import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  AsyncStorage,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {Button} from 'react-native-ui-kitten';

const {width, height} = Dimensions.get('window');

export default class AddTime extends Component {
  state = {
    data: [
      {label: '6 AM', value: '6am'},
      {label: '3 PM', value: '3pm'},
      {label: '9 PM', value: '9pm'},
    ],
    value:'6am'
  };
  onPress = data => {
    this.setState({value:data}, () => {

    });
  };
  nextScreen = () => {
    global.key = this.state.value;
    global.data = {}
    global.data[this.state.value] = {files: global.files.files}
    this.props.navigation.navigate('Description');
  };
  render = () => (
    <View style={styles.container}>
      <Text style={styles.title}>{'How are you?'}</Text>

      <View style={styles.normal}>
        <RadioForm
          radio_props={this.state.data}
          onPress={this.onPress}
          initial={0}
          buttonColor={"#3366ff"}
          selectedButtonColor={"#3366ff"}
          // buttonInnerColor='#3366ff'
        />
      </View>
      <Button onPress={this.nextScreen}>Next</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#222f3e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  normal: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
});
