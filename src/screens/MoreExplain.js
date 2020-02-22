import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class MoreExplain extends Component {
  render = () => (
    <View style={styles.container}>
      <View style={styles.normal}>
        <Text style={styles.title}>•</Text>
        <Text style={styles.explainTitle}>
          {"add positive quotes 2 images that you like"}
        </Text>
      </View>
      <View style={styles.normal}>
        <Text style={styles.title}>•</Text>
        <Text style={styles.explainTitle}>
          The app will send them peniookally to keep your mind focused on positivity
        </Text>
      </View>
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
  normal: {
    width: '100%',
    paddingHorizontal: 20,
    // flex:1,
    flexDirection:'row',
    marginBottom: 20,
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    // marginBottom: 10,
  },
  explainTitle: {
    fontWeight: '500',
    fontSize: 28,
    paddingLeft: 5,
    letterSpacing: 3,
    textTransform:'uppercase'
  },
});
