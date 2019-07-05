import React from 'react';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Text, Container, Content, View } from 'native-base';
import { get } from 'lodash';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import { getUserById, updateUser, addNewUser } from '../../actions/users';
import { getUserData, getLoadingUsers } from '../../selectors/users';
import styles from './styles';

class UserScreen extends React.PureComponent {
  state = {
    name: null,
    mode: 'update',
  };

  componentWillMount() {
    const { getUserById, navigation } = this.props;
    const id = navigation.getParam('id');

    // update or add mode
    id ? getUserById(id) : this.setState({ mode: 'add', name: '' });
  }

  /**
   * Submit action
   *
   * @memberof UserScreen
   */
  submit() {
    const { mode, name } = this.state;
    const { addNewUser, updateUser, user } = this.props;

    mode === 'add'
      ? addNewUser({ name })
      : updateUser({
          id: get(user, 'id'),
          name: name || get(user, 'name'),
        });
  }

  render() {
    const { loading, user } = this.props;
    const { name, mode } = this.state;

    if (loading && user) {
      return <LoadingModal loading={loading}></LoadingModal>;
    }

    return (
      <Container>
        <Content style={styles.contentContainer}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ name: text })}
            value={mode === 'add' ? name : name || get(user, 'name')}
          />
          <View style={styles.contentContainer}>
            <Button full onPress={() => this.submit()}>
              <Text>Submit</Text>
            </Button>
          </View>
        </Content>
      </Container>
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
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: getUserData(state),
  loading: getLoadingUsers(state),
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
