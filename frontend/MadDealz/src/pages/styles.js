import {StyleSheet, Dimensions} from 'react-native';

const HEADER_MAX_HEIGHT = 300;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    flex: 1,
    paddingTop: 15,
    alignItems: 'center',
  },
  scroll: {
    backgroundColor: 'black',
    height: Dimensions.get('screen').height,
  },
  searchbarinput: {
    backgroundColor: 'white',
  },
  button: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#990000',
    marginRight: 15,
    elevation: 1,
    zIndex: 1,
  },
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#990000',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    elevation: 4,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT + 20 : 20,
    paddingBottom: 30,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbar: {
    top: 0,
    backgroundColor: 'transparent',
    width: Dimensions.get('screen').width * 0.75,
    alignItems: 'center',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  item: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#990000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
    color: '#ebe6e6',
  },
  address: {
    fontSize: 16,
    color: '#ebe6e6',
  },
  searchbarinputtext: {
    color: 'black',
  },
  dialogviewouter: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 10,
  },
  dialogviewinner: {
    paddingRight: 150,
    paddingTop: 10,
    elevation: 1,
    zIndex: 5,
  },
  dialogviewtext: {
    fontSize: 18,
    paddingBottom: 8,
  },
});