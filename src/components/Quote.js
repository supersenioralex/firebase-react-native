import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableNativeFeedback,
  AsyncStorage,
} from 'react-native';
import {Button, Input, Icon} from 'react-native-ui-kitten';
import ImagePicker from 'react-native-image-picker';

import F8Touchable from '../utils/F8Touchable';
const {width, height} = Dimensions.get('window');
import Fire from '../utils/Firebase';
// import AsyncStorage from '@react-native-community/async-storage';

export default class Quote extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    image: null,
  };

  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  uploadToFirebase = blob => {
    return new Promise((resolve, reject) => {
      Fire.shared
        .uploadImage(blob)
        .then(snapshot => {
          blob.close();

          resolve(snapshot);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  selectImage = async () => {
    const _self = this;
    const {index} = this.props;
    ImagePicker.launchImageLibrary({mediaType: 'Images'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        try {
          _self.props.setSpiner(true);
          this.uriToBlob(response.uri)
            .then(blob => {
              return this.uploadToFirebase(blob);
            })
            .then(snapshot => {
              snapshot.ref.getDownloadURL().then(url => {
                global.files = {
                  files: [{
                    filePath: url,
                  }],
                };
                _self.props.setSpiner(false);
                _self.props.navigation.navigate('AddTime');
              })
              // console.log(url['i'])
              
            })
            .catch(error => {
              console.log(error);
              _self.props.setSpiner(false);
              throw error;
            });
        } catch (error) {
          _self.props.setSpiner(false);
          console.log(error);
        }
      }
    });
  };
  render = () => (
    <View style={styles.container}>
      <View style={styles.plus}>
        <F8Touchable
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          onPress={this.props.addQuote}>
          <Text style={styles.plusText}>⊕</Text>
        </F8Touchable>
      </View>
      <View style={styles.main}>
        <Button
          onPress={this.selectImage}
          style={{
            alignItems: 'center',
            padding: 10,
          }}>
          Add an image
        </Button>
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
    paddingBottom: 20,
    flexDirection: 'row',
    // backgroundColor:'red'
  },

  plus: {
    flex: 1,
  },
  plusText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    textAlign: 'center',
    color: 'white',
  },
  main: {
    flex: 9,
    borderColor: '#000',
    backgroundColor: '#3d4dff',
  },
  textInput: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
});
