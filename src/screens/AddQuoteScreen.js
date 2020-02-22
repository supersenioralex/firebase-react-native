import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import Quote from '../components/Quote';
import Spinner from 'react-native-loading-spinner-overlay';

const {width, height} = Dimensions.get('window');

export default class AddQuoteScreen extends Component {
  state = {
    count: 1,
    spinner: false,
  };

  setSpiner = spinner => {
    this.setState({spinner});
  };

  renderItem = () => {
    let items = [];
    for (let i = 0; i < this.state.count; i++) {
      items.push(
        <Quote
          index={i + 1}
          addQuote={this.addQuote}
          key={i}
          navigation={this.props.navigation}
          setSpiner={this.setSpiner}
        />,
      );
    }
    return items;
  };
  addQuote = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render = () => (
    <View style={styles.container}>
      <Spinner
        visible={this.state.spinner}
        textContent={'Uploading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Text style={styles.title}>click ⊕ to add quote or image</Text>

      <ScrollView style={styles.normal}>{this.renderItem()}</ScrollView>
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
  spinnerTextStyle: {
    color: '#FFF',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
    paddingHorizontal: 20,
  },
  normal: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
});
