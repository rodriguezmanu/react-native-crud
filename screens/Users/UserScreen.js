import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { Button, Text, Container, Content, View } from 'native-base';
import { get } from 'lodash';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import { getUserById, updateUser, addNewUser, updateMode } from '../../actions/users';
import { getUserData, getLoadingUsers, getModeUser } from '../../selectors/users';
import { required } from '../../util';
import RFTextInput from '../../components/RFTextInput/RFTextInput';
import styles from './styles';

class UserScreen extends React.PureComponent {
  componentWillMount() {
    const { getUserById, navigation, updateMode } = this.props;
    const id = navigation.getParam('id');

    // update or add mode
    if (id) {
      getUserById(id);
      updateMode('update');
    } else {
      updateMode('add');
    }
  }

  /**
   * Submit action
   *
   * @memberof UserScreen
   */
  submit(val) {
    const { name } = this.state;
    const { addNewUser, updateUser, mode, user } = this.props;

    mode === 'add'
      ? addNewUser({ name: get(val, 'name') })
      : updateUser({
          id: get(user, 'id'),
          name: name || get(val, 'name'),
        });
  }

  render() {
    const { handleSubmit, mode, loading, user, valid, pristine, submitting } = this.props;

    if (loading && user) {
      return <LoadingModal loading={loading}></LoadingModal>;
    }

    return (
      <Container>
        <Content style={styles.contentContainer}>
          <Field
            name="name"
            returnKeyType="next"
            placeholder="Name"
            iconName="contact"
            validate={[required]}
            validateOn="blur"
            component={RFTextInput}
          />
          <View style={styles.contentContainer}>
            <Button
              full
              onPress={handleSubmit(val => this.submit(val))}
              disabled={!valid || pristine || submitting}
            >
              <Text>Submit</Text>
            </Button>
          </View>
          <Text>{mode}</Text>
          <Text>{valid.toString()}</Text>
          <Text>{pristine.toString()}</Text>
          <Text>{submitting.toString()}</Text>
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
  updateMode: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: getUserData(state),
  mode: getModeUser(state),
  loading: getLoadingUsers(state),
  initialValues: {
    name: getModeUser(state) === 'update' ? getUserData(state).name : '',
  },
});

const mapDispatchToProps = {
  getUserById,
  updateUser,
  addNewUser,
  updateMode,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({
    form: 'user-form',
    enableReinitialize: true,
  })
)(UserScreen);
