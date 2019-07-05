import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Content, Button, Text, Input, Form, Item, Label } from 'native-base';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import ListUsers from '../../containers/ListUsers/ListUsers';
import { getUsers, filterNames } from '../../actions/users';
import { getUsersData, getLoadingUsers } from '../../selectors/users';
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
    const { users, navigation, loading } = this.props;
    const { search } = this.state;

    if (loading && users) {
      return <LoadingModal loading={loading}></LoadingModal>;
    }

    return (
      <Container>
        <View style={styles.header}>
          <View style={styles.getStartedContainer}>
            <Form>
              <Item stackedLabel>
                <Label>Search users</Label>
                <Input onChangeText={text => this.searchName(text)} value={search} />
              </Item>
            </Form>
          </View>
        </View>
        <Content>
          <ListUsers navigation={navigation} data={users}></ListUsers>
        </Content>
        <View style={styles.footer}>
          <Button full onPress={() => navigation.navigate('User')}>
            <Text>Add new</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

HomeScreen.navigationOptions = {
  headerTitle: 'Users',
};

HomeScreen.propTypes = {
  getUsers: PropTypes.func.isRequired,
  filterNames: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  users: getUsersData(state),
  loading: getLoadingUsers(state),
});

const mapDispatchToProps = {
  getUsers,
  filterNames,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
