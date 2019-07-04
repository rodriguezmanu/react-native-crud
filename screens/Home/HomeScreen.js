import React from 'react';
import { ScrollView, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import ListUsers from '../../containers/ListUsers/ListUsers';
import { getUsers, filterNames } from '../../actions/users';
import styles from './styles';

class HomeScreen extends React.Component {
  state = {
    search: null,
  };

  componentWillMount() {
    const { getUsers, navigation } = this.props;

    getUsers();

    this.willFocusListener = navigation.addListener('willFocus', () => {
      getUsers();
    });
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  /**
   * Search Users handler
   *
   * @param {string} text
   * @memberof HomeScreen
   */
  searchName(text) {
    const { filterNames, users } = this.props;

    this.setState({ search: text });

    filterNames(users, text);
  }

  render() {
    const { users, navigation } = this.props;
    const { loading } = users;
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {loading && users.data ? (
            <LoadingModal loading={loading}></LoadingModal>
          ) : (
            <View style={styles.getStartedContainer}>
              <Text>Search Users</Text>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.searchName(text)}
                value={search}
              />
              <ListUsers navigation={navigation} data={users.data}></ListUsers>
            </View>
          )}
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Button onPress={() => navigation.navigate('User')}>
            <Text>Add new</Text>
          </Button>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  headerTitle: 'Users',
};

HomeScreen.propTypes = {
  getUsers: PropTypes.func.isRequired,
  filterNames: PropTypes.func.isRequired,
  users: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = {
  getUsers,
  filterNames,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
