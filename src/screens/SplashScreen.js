import React from 'react';
import {View, Text} from 'react-native';
import Fire from '../utils/Firebase';
import Spinner from 'react-native-loading-spinner-overlay';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve => {
      Fire.shared.checkDevice().then(res => {
        console.log('res', res);
        if (res.id) resolve(res.id);
      });

      // setTimeout(() => {
      //   resolve('result');
      // }, 2000);
    });
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Spinner
          visible={false}
          textContent={'Uploading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={styles.textStyles}>WELCOME</Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3366ff',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
};

export default SplashScreen;
