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
    scroll2: {
        flex: 1,
        // backgroundColor:'black',
    },
    homeBackground: {
        flex: 1,
        resizeMode: 'cover'
    },
    searchbar: {
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
        // flex: 1,
        height: null,
        width: null,
        flex: 1
        // resizeMode="stretch",
    },
    idk: {
        flex: 1,
        backgroundColor: 'black'
    },
    idk2: {
        flex: 1,
        height: 1000,
        backgroundColor: 'yellow'
    },
    idk3: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: 'red'
    },
    idk4: {
        flex: 1,
    },
    button: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#990000',
        marginRight: 15,
    }
});