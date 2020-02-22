import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import {Button} from 'react-native-ui-kitten';

const { width, height } = Dimensions.get('window');

export default class HomeScreen extends Component {
  render = () => (
    <View style={styles.container}>
      <Text style={styles.title}>{"what are your".toUpperCase()}</Text>
      <Text style={styles.oneTen}>{"1  +  10"}</Text>
      <View style={{
        width:'100%',
        paddingHorizontal: 20,
        marginBottom: 25
      }}>
        <View style={styles.best}>
        <Text style={styles.title}>1</Text>
        <Text style={[styles.explainTitle, {paddingLeft: 30}]}>{"• worst feeling".toUpperCase()}</Text>
        </View>
        <View style={styles.best}>
        <Text style={[styles.explainTitle, { paddingLeft: 15}]}>• • •</Text>
        {/* <Text style={[styles.explainTitle, {paddingLeft: 30}]}>{"• worst feeling".toUpperCase()}</Text> */}
        </View>
        <View style={styles.best}>
        <Text style={styles.title}>10</Text>
        <Text style={[styles.explainTitle, {paddingLeft: 15}]}>{"• best feeling".toUpperCase()}</Text>
        </View>
      </View>
      <Button onPress={()=> this.props.navigation.navigate('AddQuote')}>Skip Explain</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#222f3e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20
  },
  best: {
    // flex:1
    flexDirection: 'row'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  explainTitle: {
    fontWeight: '500',
    fontSize: 20,
    paddingVertical: 4
  },
  oneTen: {
    fontWeight: 'bold',
    fontSize: 50,
    marginVertical: 40
  },
});
