import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Item, Input, Label, Icon, View } from 'native-base';
import styles from './styles';
import { getIconName } from '../../util';

const RFTextInput = ({
  meta: { touched, error },
  input: { onChange, value },
  uri,
  iconName,
  platformIcon,
  iconStyle,
  placeholder,
  ...rest
}) => (
  <View>
    <Item floatingLabel style={styles.inputContainer}>
      <Label>{placeholder}</Label>
      <Input
        {...rest}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onChangeText={onChange}
        value={value}
        style={styles.inputs}
      />
      {iconName && (
        <Icon
          name={getIconName(platformIcon, iconName)}
          size={25}
          style={{ ...styles.icon, ...iconStyle }}
        />
      )}
    </Item>
    {touched && error && <Text style={styles.error}>{error}</Text>}
  </View>
);

RFTextInput.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.string,
  }),
  uri: PropTypes.string,
  iconName: PropTypes.string,
  platformIcon: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  placeholder: PropTypes.string.isRequired,
  iconStyle: PropTypes.shape({}),
};

RFTextInput.defaultProps = {
  meta: {},
  input: {},
  uri: null,
  platformIcon: true,
  iconStyle: {},
  iconName: null,
};

export default RFTextInput;
