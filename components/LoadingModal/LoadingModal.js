import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, Modal, Text } from 'react-native';

import styles from './styles';

const LoadingModal = ({ loading, title }) => (
  <Modal transparent animationType="none" visible={loading} onRequestClose={() => {}}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <Text>{title}</Text>
        <ActivityIndicator animating={loading} />
      </View>
    </View>
  </Modal>
);

LoadingModal.defaultProps = {
  title: 'Loading...',
};

LoadingModal.propTypes = {
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

export default LoadingModal;
