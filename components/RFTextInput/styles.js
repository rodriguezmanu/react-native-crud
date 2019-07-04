import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';

export default StyleSheet.create({
  error: {
    color: colors.red,
    width: 250,
    marginVertical: 10,
    alignItems: 'center',
  },
  inputContainer: {
    width: 250,
    height: 50,
    marginVertical: 10,
  },

  icon: {
    color: colors.grey,
  },
});
