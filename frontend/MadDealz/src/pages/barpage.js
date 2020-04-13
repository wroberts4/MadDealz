import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';
import {Card, Image, Button, Icon, Header} from 'react-native-elements';
import { goToTabs } from '../../navigation';
import styles from './styles';

bar_requests = require('../requests/bar_requests');

class Barpage extends React.Component {

    tabsPage = async () => {
        goToTabs();
    };

    upCount = async () => {
        this.setState({count: (this.state.count+1)%2});
    }

    constructor(props) {
        super(props);
        
        this.state = {
            count: 0,
            barName: this.props.bar.name,
            barId: '',
            deals: this.props.bar.deals,
            reviews: []
        };

        //bar_requests.get_bar(this.props.barId).then(name => {this.setState({barName: name.name})});
        //bar_requests.get_deals(this.props.barId).then(deals => {this.setState({deals: deals})});
        bar_requests.get_reviews(this.props.bar._id).then(reviews => {this.setState({reviews: reviews})});
        // TODO: Set count to 0 if bar is not in user's favorites list, 1 if bar is in user's favorites
    }

    render() {
        
        console.log(this.state.count);

        //TODO: onPress on favorites button, add/remove bar from favorites

        return (
            <View style={{flex:1}}>
                <Header
                    containerStyle = {{ backgroundColor: '#990000' }}
                    leftComponent = { <Button icon = {<Icon name = 'arrow-back'/> } 
                        onPress = {this.tabsPage} buttonStyle = {{backgroundColor: '#990000'}}/>}
                    rightComponent = { <Button icon = {<Icon name = {(this.state.count == 0 ? 'favorite-border' : 'favorite')}/>}
                        onPress = {this.upCount} buttonStyle = {{backgroundColor: '#990000'}}/>}
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
                                height: 200,
                                width: Dimensions.get('screen').width - 20,
                            }}
                            source={require('../../assets/UU.jpg')}
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
                            alignItems: 'center',
                        }}>
                        <Text>Reviews here</Text>
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
