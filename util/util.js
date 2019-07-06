import _ from 'lodash';
import { Platform } from 'react-native';
import Toast from 'react-native-root-toast';

/**
 * Create Type Action redux
 *
 * @param {string} type
 */
export const createAsyncActionType = type => {
  return {
    REQUESTED: `${type}_REQUESTED`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`,
    FINISHED: `${type}_FINISHED`,
  };
};

/**
 * Show tost error message
 *
 * @param {string} backgroundColor
 * @param {number} duration
 * @param {string} error
 */
export const errorToastMessage = (
  backgroundColor = '#ca0000',
  duration = 3000,
  error = 'Error, please try again'
) => {
  Toast.show(error, {
    duration,
    animation: true,
    backgroundColor,
  });
};

/**
 * Handler icons name depending on platform
 *
 * @param {string} platformIcon
 * @param {string} iconName
 * @returns {string}
 */
export const getIconName = (platformIcon, iconName) =>
  platformIcon ? (Platform.OS === 'ios' ? `ios-${iconName}` : `md-${iconName}`) : iconName;

/**
 * Validation redux form
 *
 * @param {string} value
 */
export const required = value => (value ? undefined : 'Required');
