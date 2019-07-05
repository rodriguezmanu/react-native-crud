import React from 'react';
import { TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import { getUserById, updateUser, addNewUser } from '../../actions/users';
import styles from './styles';

class UserScreen extends React.PureComponent {
  state = {
    name: null,
    mode: 'update',
  };

  componentWillMount() {
    const { getUserById, navigation } = this.props;
    const id = navigation.getParam('id');
    // update mode
    if (id) {
      getUserById(id);
    } else {
      // add mode
      this.setState({ mode: 'add', name: '' });
    }
  }

  /**
   * Submit action
   *
   * @memberof UserScreen
   */
  submit() {
    const { mode, name } = this.state;
    const { addNewUser, updateUser, users } = this.props;

    if (mode === 'add') {
      addNewUser({ name });
    } else {
      const params = {
        id: users.currentUser.id,
        name: name || users.currentUser.name,
      };

      updateUser(params);
    }
  }

  render() {
    const { users } = this.props;
    const { loading, currentUser } = users;
    const { name, mode } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
          {loading && currentUser ? (
            <LoadingModal loading={loading}></LoadingModal>
          ) : (
            <View style={styles.getStartedContainer}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.setState({ name: text })}
                value={mode === 'add' ? name : name || currentUser.name}
              />
              <View>
                <Button full onPress={() => this.submit()}>
                  <Text>Submit</Text>
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

UserScreen.navigationOptions = {
  headerTitle: 'User details',
};

UserScreen.propTypes = {
  getUserById: PropTypes.func.isRequired,
  addNewUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  users: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = {
  getUserById,
  updateUser,
  addNewUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScreen);
