import { StyleSheet } from 'react-native';
import colors from '../constants/Colors';

export default StyleSheet.create({
  buttonContainer: {
    marginLeft: 10,
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 18,
    color: colors.grey,
  },
  bodyContainer: {
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    marginLeft: 0,
  },
  startText: {
    alignSelf: 'flex-start',
  },
  noRight: {
    paddingRight: 0,
    marginRight: 0,
  },
});
