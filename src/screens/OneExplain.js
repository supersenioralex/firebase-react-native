import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class OneExplain extends Component {
  render = () => (
    <View style={styles.container}>
      <Text style={styles.oneTen}>{'1'}</Text>
      <View style={styles.normal}>
        <Text style={styles.title}>{'Explain'.toUpperCase()}</Text>
      </View>

      <View style={styles.normal}>
        <Text style={styles.explainTitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
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

  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  explainTitle: {
    fontWeight: '500',
    fontSize: 20,
  },
  oneTen: {
    fontWeight: 'bold',
    fontSize: 50,
    fontSize: 50,
    marginBottom: 20,
  },
  normal: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
