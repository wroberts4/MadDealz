import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {
  Card,
  Image,
  Button,
  Icon,
  Header,
  ListItem,
  ThemeConsumer,
} from 'react-native-elements';
import {goToTabs} from '../../navigation';
import styles from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

bar_requests = require('../requests/bar_requests');
user_requests = require('../requests/user_requests');

class Barpage extends React.Component {
  tabsPage = async () => {
    goToTabs();
  };

  constructor(props) {
    super(props);
    var date = new Date();
    this.state = {
      count: 0,
      //barName: this.props.bar.name,
      //barId: this.props.bar._id,
      deals: this.props.bar.deals,
      barLongitude: this.props.bar.location.lon, 
      barLatitude: this.props.bar.location.lat,
      img: 'https://api.maddealz.software/images/bar/' + this.props.bar.image,
      fail: false,
      day: date.getDay()
      //reviews: []
    };
  }

  handleFavorite = async () => {
    if (this.state.count) {
      try {
        let user = JSON.parse(await AsyncStorage.getItem('@user'));
        await user_requests.remove_favorite_bar(
          user.username,
          this.props.bar._id,
          5000,
        );
        await bar_requests.update_favorites(this.props.bar._id, -1, 5000);
        user.favorites.bars.splice(
          user.favorites.bars.indexOf(this.props.bar._id),
          1,
        );
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        this.setState({count: 0});
      } catch (err) {
        console.log('Error removing favorite: ', err);
      }
    } else {
      try {
        let user = JSON.parse(await AsyncStorage.getItem('@user'));
        await user_requests.add_favorite_bar(
          user.username,
          this.props.bar._id,
          5000,
        );
        await bar_requests.update_favorites(this.props.bar._id, 1, 5000);
        user.favorites.bars.push(this.props.bar._id);
        await AsyncStorage.setItem('@user', JSON.stringify(user));
        this.setState({count: 1});
      } catch (err) {
        console.log('Error adding favorite: ', err);
      }
    }
  };

  /*
    _getReviews = async () => {
        let reviews = await bar_requests.get_reviews(this.props.bar._id);
        this.setState({reviews: reviews});
    }
    */

  _checkFavorite = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('@user'));
    if (user.favorites.bars.includes(this.props.bar._id))
      this.setState({count: 1});
  };

  componentDidMount() {
    this._checkFavorite();
    //this._getReviews();
    this._checkImageURL(this.state.img);
    console.log(this.props)
  }

  _checkImageURL(url) {
    fetch(url)
      .then(res => {
        if (res.status == 404) {
          this.setState({fail: true});
        } else {
          return false;
        }
      })
      .catch(err => {
        this.setState({fail: true});
      });
  }

  renderListItem = (item, i, day) => {
    if(item.times[day]) {
      return (<ListItem
        containerStyle={{
          width: '100%',
          padding: 5,
          alignItems: 'center',
          backgroundColor: this.state.day == i? '#990000' : 'white'
        }}
        key={i}
        title={item.info}
        subtitle={ item.times[day]['start'] +
              ' - ' +
              item.times[day]['end']
        }
      />)
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          containerStyle={styles.header_2}
          leftComponent={
            <Button
              icon={<Icon name="arrow-back" />}
              onPress={this.tabsPage}
              buttonStyle={{backgroundColor: '#990000'}}
            />
          }
          rightComponent={
            <Button
              icon={
                <Icon
                  name={this.state.count == 0 ? 'favorite-border' : 'favorite'}
                />
              }
              onPress={this.handleFavorite}
              buttonStyle={{backgroundColor: '#990000'}}
            />
          }
          centerComponent={
            <Text style={{ 
              color: '#ccc',
              fontSize: 20,
              fontWeight: 'bold', 
              marginBottom: 5} }>{this.props.bar.name}</Text>
          }
        />
        <ScrollView style={styles.scroll}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 5,
            }}>
            <Image
              style={{
                height: 350,
                width: 350,
              }}
              source={
                this.state.fail
                  ? require('../../assets/notfound.png')
                  : {uri: this.state.img}
              }
              resizeMode="contain"
            />
          </View>
          <Card title='Sunday' titleStyle={{color: 'black'}} containerStyle={this.state.day == 0 ? {borderRadius: 10, backgroundColor: '#990000'} : {borderRadius: 10}}
            wrapperStyle={this.state.day == 0 ? {backgroundColor: '#990000'} : {backgroundColor: 'white'}}>
            {this.state.deals.map((item, i) => (
              this.renderListItem(item, 0, 'Sunday')
            ))}
          </Card>
          <Card title="Monday" titleStyle={{color: 'black'}} containerStyle={this.state.day == 1 ? {borderRadius: 10, backgroundColor: '#990000'} : {borderRadius: 10}}
            wrapperStyle={this.state.day == 0 ? {backgroundColor: '#990000'} : {backgroundColor: 'white'}}>
            {this.state.deals.map((item, i) => (
              this.renderListItem(item, 1, 'Monday')
            ))}
          </Card>
          <Card title="Tuesday" titleStyle={{color: 'black'}} containerStyle={this.state.day == 2 ? {borderRadius: 10, backgroundColor: '#990000'} : {borderRadius: 10}}>
            {this.state.deals.map((item, i) => (
              this.renderListItem(item, 2, 'Tuesday')
            ))}
          </Card>
          <Card title="Wednesday" titleStyle={{color: 'black'}} containerStyle={this.state.day == 3 ? {borderRadius: 10, backgroundColor: '#990000'} : {borderRadius: 10}}>
            {this.state.deals.map((item, i) => (
              this.renderListItem(item, 3, 'Wednesday')
            ))}
          </Card>
          <Card title="Thursday" titleStyle={{color: 'black'}} containerStyle={this.state.day == 4 ? {borderRadius: 10, backgroundColor: '#990000'} : {borderRadius: 10}}>
            {this.state.deals.map((item, i) => (
              this.renderListItem(item, 4, 'Thursday')
            ))}
          </Card>
          <Card title="Friday" titleStyle={{color: 'black'}} containerStyle={this.state.day == 5 ? {borderRadius: 10, backgroundColor: '#990000'} : {borderRadius: 10}}>
            {this.state.deals.map((item, i) => (
              this.renderListItem(item, 5, 'Friday')
            ))}
          </Card>
          <Card title="Saturday" titleStyle={{color: 'black'}} containerStyle={this.state.day == 6 ? {borderRadius: 10, backgroundColor: '#990000'} : {borderRadius: 10}}>
            {this.state.deals.map((item, i) => (
              this.renderListItem(item, 6, 'Saturday')
            ))}
          </Card>
          <Card title="Contact Us" containerStyle={{borderRadius: 10}}>
            <Text>Hours</Text>
            <Text>Phone Number</Text>
            <Text>Email Address?</Text>
          </Card>
          <View style={styles.mapContainer}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                initialRegion={{
                    latitude: this.state.barLatitude,
                    longitude: this.state.barLongitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    coordinate={{latitude: this.state.barLatitude, 
                    longitude: this.state.barLongitude}}
                    title={this.props.bar.name}
                    pinColor={"red"}
                />
            </MapView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

/*
<Card
    title="Reviews"
    containerStyle={{ borderRadius: 10 }}
>
    {
        this.state.reviews.map((item, i) => (
        <ListItem
            containerStyle={{
                width: '100%',
                padding: 5,
                alignItems: 'center'
            }}
            key={i}
            title={'"'+item.content+'"'}
            subtitle={"-"+item.user}
        />
        ))
    }   
</Card>
*/

export default Barpage;
