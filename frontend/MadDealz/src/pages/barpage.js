import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Platform,
    FlatList,
} from 'react-native';
import {Card, Image, Button, Icon, Header, ListItem} from 'react-native-elements';
import { goToTabs } from '../../navigation';
import styles from './styles';

import AsyncStorage from '@react-native-community/async-storage';

bar_requests = require('../requests/bar_requests');
user_requests = require('../requests/user_requests');

class Barpage extends React.Component {

    tabsPage = async () => {
        goToTabs();
    };

    constructor(props) {
        super(props);
        
        this.state = {
            count: 0,
            barName: this.props.bar.name,
            barId: this.props.bar._id,
            deals: this.props.bar.deals,
            img: 'https://api.maddealz.software/images/bar/'+this.props.bar._id+'.png',
            fail: false,
            reviews: []
        };

        //bar_requests.get_bar(this.props.barId).then(name => {this.setState({barName: name.name})});
        //bar_requests.get_deals(this.props.barId).then(deals => {this.setState({deals: deals})});
    }

    handleFavorite = async () => {
        if (this.state.count) {
            try {
                let user = JSON.parse(await AsyncStorage.getItem('@user'));
                await user_requests.remove_favorite_bar(user.username, this.props.bar._id, 5000);
                await bar_requests.update_favorites(this.props.bar._id, -1, 5000);
                user.favorites.bars.splice(user.favorites.bars.indexOf(this.props.bar._id), 1);
                await AsyncStorage.setItem('@user', JSON.stringify(user));
                this.setState({count: 0});
            } catch (err) {
                console.log("Error removing favorite: ", err);
            }
        } else {
            try {
                let user = JSON.parse(await AsyncStorage.getItem('@user'));
                await user_requests.add_favorite_bar(user.username, this.props.bar._id, 5000);
                await bar_requests.update_favorites(this.props.bar._id, 1, 5000);
                user.favorites.bars.push(this.props.bar._id);
                await AsyncStorage.setItem('@user', JSON.stringify(user));
                this.setState({count: 1});
            } catch (err) {
                console.log("Error adding favorite: ", err);
            }
        }
    }

    _getReviews = async () => {
        let reviews = await bar_requests.get_reviews(this.props.bar._id);
        this.setState({reviews: reviews});
    }

    _checkFavorite = async () => {
        let user = JSON.parse(await AsyncStorage.getItem('@user'));
        if (user.favorites.bars.includes(this.props.bar._id))
            this.setState({count: 1});
    }

    componentDidMount() {
        this._checkFavorite();
        this._getReviews();
        this._checkImageURL(this.state.img);
    }

    _checkImageURL(url) {
        fetch(url).then(res => {
           if(res.status == 404) {
            this.setState({fail: true})
           } else{
                return false
          }
        }).catch(err=>{this.setState({fail: true})})
    }

    render() {

        return (
            <View style={{flex:1}}>
                <Header
                    containerStyle = {{ backgroundColor: '#990000' }}
                    leftComponent = { <Button icon = {<Icon name = 'arrow-back'/> } 
                        onPress = {this.tabsPage} buttonStyle = {{backgroundColor: '#990000'}}/>}
                    rightComponent = { <Button icon = {<Icon name = {(this.state.count == 0 ? 'favorite-border' : 'favorite')}/>}
                        onPress = {this.handleFavorite} buttonStyle = {{backgroundColor: '#990000'}}/>}
                    centerComponent = {{ text: this.state.barName}}
                />
                <ScrollView style={styles.scroll}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 5
                        }}>
                        <Image
                            // TODO: Figure out how to make the whole image appear regardless of image size
                            // TODO: Get the image pulled from the database
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 100/2
                            }}
                            //source={require('../../assets/UU.jpg')}
                            // TODO: Add image coming soon picture for default
                            source={this.state.fail ? require('../../assets/notfound.png') : {uri: this.state.img}}
                            resizeMode="contain"
                        />
                    </View>
                    <Card
                        title="Dealz"
                        containerStyle={{
                            borderRadius: 10,
                            alignItems: 'center',
                        }}>
                        <Text>Sunday</Text>
                        <Text>Monday</Text>
                        {/* {
                            this.state.deals.map((item, i) => (
                            <ListItem
                                containerStyle={{
                                    width: '100%',
                                    padding: 5,
                                    alignItems: 'center'
                                }}
                                key={i}
                                title={item.info}
                                subtitle={item.times}
                            />
                            ))
                        }    */}
                        <Text>Tuesday</Text>
                        <Text>Wednesday</Text>
                        <Text>Thursday</Text>
                        <Text>Friday</Text>
                        <Text>Saturday</Text>
                    </Card>
                    <Card
                        title="Reviews"
                        containerStyle={{
                            borderRadius: 10,
                        }}>
                        {
                            this.state.reviews.map((item, i) => (
                            <ListItem
                                containerStyle={{
                                    width: '100%',
                                    padding: 5,
                                    alignItems: 'center'
                                }}
                                key={i}
                                title={item.content}
                                subtitle={item.user}
                            />
                            ))
                        }   
                    </Card>
                    <Card
                        title="Contact Us"
                        containerStyle={{
                            borderRadius: 10,
                            alignItems: 'center',
                        }}>
                        <Text>Hours</Text>
                        <Text>Phone Number</Text>
                        <Text>Email Address?</Text>
                    </Card>
                </ScrollView>
            </View>
        );
    }
}

export default Barpage;
