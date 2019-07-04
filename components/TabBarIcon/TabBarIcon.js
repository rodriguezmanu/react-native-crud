import React from 'react';
import { Icon } from 'expo';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';

class TabBarIcon extends React.Component {
  getIconName = iconName => (Platform.OS === 'ios' ? `ios-${iconName}` : `md-${iconName}`);

  render() {
    const { name, focused } = this.props;

    return (
      <Icon.Ionicons
        name={this.getIconName(name)}
        size={28}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default TabBarIcon;
