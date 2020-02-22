import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  AsyncStorage,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import F8Touchable from '../utils/F8Touchable';
import {Button, Input} from 'react-native-ui-kitten';
import Fire from '../utils/Firebase';
import Spinner from 'react-native-loading-spinner-overlay';
const {width, height} = Dimensions.get('window');

export default class Description extends Component {
  state = {
    data: [
      {label: '1', value:'1'},
      {label: '2', value:'2'},
      {label: '3', value:'3'},
      {label: '4', value:'4'},
      {label: '5', value:'5'},
      {label: '6', value:'6'},
      {label: '7', value:'7'},
      {label: '8', value:'8'},
      {label: '9', value:'9'},
      {label: '10', value:'10'},
    ],
    description: [{value: ''}],
    spinner: false,
    value: '1',
  };
  onPress = data => {
    console.log(data)
    this.setState({value: data});
  };
  saveButton = async () => {
    try {
      this.setSpiner(true);
      let key = global.key
      let data = global.data[key]
      // let description = []
      global.data[key] = {
        ...data,
        description: this.state.description,
        value: this.state.value,
      };
      console.log(global.data, key)
      await Fire.shared.setDaily(global.data);
      this.setSpiner(false);
      this.props.navigation.navigate('Tabs');
    } catch (e) {
      this.setSpiner(false);
      console.log(e);
    }
  };
  textDescription = () => {
    return this.state.description.map((item, index) => {
      return (
        <View style={styles.addContainer} key={index}>
          <View style={styles.plus}>
            <F8Touchable
              background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
              onPress={this.addDescription}>
              <Text style={styles.plusText}>{'⊕'}</Text>
            </F8Touchable>
          </View>
          <View style={styles.main}>
            <Input
              status="primary"
              placeholder="Place your Text"
              value={item.value}
              onChangeText={value => this.changeText(value, index)}
            />
          </View>
        </View>
      );
    });
  };

  setSpiner = spinner => {
    this.setState({spinner});
  };

  addDescription = () => {
    let desc = this.state.description;
    desc.push({value: ''});
    this.setState({description: desc});
  };

  changeText = (value, index) => {
    let desc = this.state.description;
    desc[index].value = value;
    this.setState({description: desc});
  };
  render = () => (
    <View style={styles.container}>
      <Spinner
        visible={this.state.spinner}
        textContent={'Saving...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.normal}>
        <RadioForm
          radio_props={this.state.data}
          initial={0}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={'#2196f3'}
          animation={true}
          onPress={this.onPress}
          buttonSize={12}
        />
      </View>
      <View style={[styles.normal, {alignItems: 'flex-start'}]}>
        <Text style={styles.title}>Add Description</Text>
      </View>
      <ScrollView style={styles.scroll}>
        {this.textDescription()}
        <Button onPress={this.saveButton} style={{marginBottom: 10}}>
          save
        </Button>
      </ScrollView>
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
  scroll: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  plus: {
    flex: 1,
  },
  plusText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  main: {
    flex: 9,
    paddingRight: 1,
    // borderColor: '#000',
    // backgroundColor: '#3d4dff',
  },

  addContainer: {
    // backgroundColor: '#222f3e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20,
    flexDirection: 'row',
    // backgroundColor:'red'
  },
});
