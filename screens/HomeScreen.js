import React from 'react';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Button, Text } from 'native-base';
import LoadingModal from '../components/LoadingModal/LoadingModal';
import { getUsers, deleteUser, filterNames } from '../actions/users';

class HomeScreen extends React.Component {
  state = {
    search: null,
  };

  componentWillMount() {
    const { getUsers } = this.props;

    getUsers();

    this.willFocusListener = this.props.navigation.addListener('willFocus', () => {
      getUsers();
    });
  }

  /**
   * Go to User page
   *
   * @param {string} id
   */
  gotoUser(id) {
    const { navigation } = this.props;

    navigation.navigate('User', { id });
  }

  searchName(text) {
    this.setState({ search: text });

    this.props.filterNames(this.props.users, text);
  }

  /**
   * Go to User page
   *
   * @param {string} id
   */
  deleteUser(id) {
    const { deleteUser } = this.props;

    deleteUser(id);
  }

  render() {
    const { users } = this.props;
    const { loading } = users;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {loading && users.data ? (
            <LoadingModal loading={loading}></LoadingModal>
          ) : (
            <View style={styles.getStartedContainer}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.searchName(text)}
                value={this.state.search}
              />
              {users.data.map(user => {
                return (
                  <TouchableOpacity
                    onPress={() => this.gotoUser(user.id)}
                    key={user.id.toString()}
                    style={{
                      backgroundColor: 'red',
                      marginBottom: 10,
                      padding: 10,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                    }}
                  >
                    <Text
                      style={{
                        flex: 1,
                      }}
                    >
                      {user.name}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                      }}
                    >
                      {user.role}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Icon name="trash" onPress={() => this.deleteUser(user.id)} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Button onPress={() => this.props.navigation.navigate('User')}>
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
  deleteUser: PropTypes.func.isRequired,
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
  }).isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = {
  getUsers,
  deleteUser,
  filterNames,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    // alignItems: 'center',
    marginHorizontal: 20,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
