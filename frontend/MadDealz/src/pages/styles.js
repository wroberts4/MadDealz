import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center'
    },
    scroll: {
        backgroundColor:'black', 
        height:Dimensions.get('screen').height
    },
    homeBackground: {
        flex: 1,
        resizeMode: 'cover'
    },
    searchbar: {
        marginTop:-30,
        marginLeft: Dimensions.get('screen').width*.10,
        flex:1, 
        backgroundColor: 'transparent',
        width: Dimensions.get('screen').width*.75,
        alignItems: 'center',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    searchbarinput: {
        backgroundColor: 'white',
    },
    homepicture: {
        height: 250, 
        width:Dimensions.get('screen').width,
        
    }
});