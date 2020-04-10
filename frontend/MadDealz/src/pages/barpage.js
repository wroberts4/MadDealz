// Page that shows up when a bar object is clicked
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
} from 'react-native';
import {Card, Image, Button, Icon, Header} from 'react-native-elements';

import { goToTabs } from '../../navigation';

import styles from './styles';
class Barpage extends React.Component {

    tabsPage = async () => {
        goToTabs();
    };

    render() {

        const { barId } = this.props;

        return (
            <View style={{flex:1}}>
                <Header
                    containerStyle = {{ backgroundColor: '#990000' }}
                    leftComponent = { <Button icon = {<Icon name = 'arrow-back'/> } onPress = {this.tabsPage} buttonStyle = {{backgroundColor: '#990000'}}/>}
                    centerComponent = {{ text: barId }}
                />
                <ScrollView style={styles.scroll}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 5
                        }}>
                        <Image
                            // TODO: Figure out how to make the whole image appear regardless of image
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
