import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  AsyncStorage,
  Image,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {Button} from 'react-native-ui-kitten';
import {LineChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import Quote from '../components/Quote';
import Fire from '../utils/Firebase';

import {formatTime, getToday} from '../utils/utils';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';

const {width, height} = Dimensions.get('window');

export default class AddTime extends Component {
  state = {
    today: new Date(),
    // data: {labels: [], datasets: [{data: []}]}
    isLoading: true,
    whyText: null,
    whyImage: null,
  };
  async componentDidMount() {
    const today = getToday();
    await this.setChart(today);
  }

  setChart = async date => {
    const daily = await Fire.shared.getDaily(date);
    console.log(daily);
    if (daily.length == 0) {
      // const data = {labels: [], datasets: [{data: []}]}
      this.setState({data: null, isLoading: false, highlight: [], images: []});
      return;
    }
    console.log('Adsf');
    const answer = daily[0].answer || {};

    const keys = Object.keys(answer);
    let data = {};
    data['labels'] = keys;
    data['datasets'] = [{data: []}];
    let highlight = [];
    let images = [];
    keys.forEach(key => {
      data['datasets'][0]['data'].push(answer[key].value);
      let text = key + ': ';
      answer[key].description.map(item => {
        text = text + ' -> ' + item.value;
      });
      highlight.push(text);
      images.push(answer[key].files[0].filePath);
    });

    this.setState({data, isLoading: false, highlight, images});
  };
  onDataPointClick = data => {
    // console.log(data)
    this.setState({
      whyText: this.state.highlight[data.index],
      whyImage: this.state.images[data.index],
    });
  };

  setSpiner = spinner => {
    this.setState({isLoading: spinner});
  };

  onDateSelected = async date => {
    this.setSpiner(true);
    const times = date.format('YYYY-MM-DD');
    await this.setChart(times);
    this.setSpiner(false);
  };

  render = () => {
    return (
      <View style={styles.container}>
        <CalendarStrip
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: 'white',
          }}
          onDateSelected={this.onDateSelected}
          style={{height: 100, paddingTop: 5, paddingBottom: 10}}
          calendarHeaderStyle={{color: 'white'}}
          calendarColor={'#7743CE'}
          dateNumberStyle={{color: 'white'}}
          dateNameStyle={{color: 'white'}}
          highlightDateNumberStyle={{color: 'yellow'}}
          highlightDateNameStyle={{color: 'yellow'}}
          disabledDateNameStyle={{color: 'grey'}}
          disabledDateNumberStyle={{color: 'grey'}}
          iconContainer={{flex: 0.1}}
        />
        {this.state.isLoading && (
          <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        )}

        {!this.state.isLoading && (
          <ScrollView style={{paddingHorizontal: 10}}>
            <View>
              {this.state.data && (
                <LineChart
                  data={this.state.data}
                  width={width - 20} // from react-native
                  height={200}
                  segments={2}
                  fromZero={true}
                  chartConfig={{
                    backgroundColor: '#000000',
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientTo: '#08130D',
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '5',
                      strokeWidth: '1',
                      stroke: '#ccff00',
                    },
                  }}
                  // // bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  onDataPointClick={this.onDataPointClick}
                />
              )}
            </View>
            {this.state.whyText && (
              <View>
                <Text style={{fontSize: 20}}>Highlighted Why</Text>
                <Text style={{fontSize: 18}}>{this.state.whyText}</Text>
                <Image
                  style={{width: '100%', height: 220}}
                  source={{uri: this.state.whyImage}}
                />
              </View>
            )}
            <View>
              <Text style={{fontSize: 20}}>Add Quote/Image</Text>
              {/* <Text style={{fontSize: 18}}>3 pm: went to work -> found a gift at my Desk</Text> */}
              <Quote
                setSpiner={this.setSpiner}
                navigation={this.props.navigation}
                key={0}
                index={1}
                addQuote={() => console.log('adsf')}
              />
            </View>
          </ScrollView>
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#222f3e',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    // paddingTop: 20,
  },
});
