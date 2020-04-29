import React, {Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity 
} from 'react-native';
import { Input } from 'react-native-elements';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import Slack from 'react-native-slack-webhook';
import {first, second, third, fourth} from '../../env';

const def = 'https://hooks.slack.com/services/';

async function slackMessage(message) {
    const slck = new Slack(def+first+second+third+fourth);
    slck.post(message, '#feedback').then(res => {
        if(res.status == 200) {
            console.log(res.status)
        } else {
            console.log(res);
        }
    }).catch(err=>{console.log(err)})
}

export default class Contact extends Component {

    
    formPress = () => {
        console.log(this.state.message);
    };

    onChangeText = async (key, val) => {
        this.setState({[key]: val});
    }
    
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        } ; 
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView style={styles.scrollContact} contentContainerStyle={styles.containerContact} keyboardShouldPersistTaps='handled'>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.imageContact}>
                    </Image>
                    <Text style={{color: 'white'}}>Questions? Comments? Complaints? 
                        Please let us know below and leave your email address if you would like a response.
                    </Text>
                    <Text style={{color: 'white', paddingBottom: 40}}>Thanks!</Text>
                    <Input 
                        placeholder='Please enter your message here.'
                        placeholderTextColor='grey'
                        inputContainerStyle={{borderColor: '#990000'}}
                        inputStyle={{color: '#990000'}}
                        autoCorrect={true}
                        multiline={true}
                        onChangeText={val => this.onChangeText('message', val)}
                    />
                    <View style={{padding: 10}}></View>
                    <TouchableOpacity style={styles.contactButton} onPress={() => slackMessage(this.state.message)}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

}