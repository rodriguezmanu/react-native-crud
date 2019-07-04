import React from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Text } from 'native-base';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import { getUserById, updateUser, addNewUser } from '../../actions/users';

class UserScreen extends React.PureComponent {
  state = {
    name: null,
    mode: 'update',
  };

  componentWillMount() {
    const { getUserById } = this.props;
    const id = this.props.navigation.getParam('id');

    if (id) {
      getUserById(id);
    } else {
      this.setState({ mode: 'add' });
    }
  }

  submit() {
    if (this.state.mode === 'add') {
      this.props.addNewUser({ name: this.state.name });
    } else {
      const params = {
        id: this.props.users.currentUser.id,
        name: this.state.name || this.props.users.currentUser.name,
      };

      this.props.updateUser(params);
    }
  }

  render() {
    const { users } = this.props;
    const { loading } = users;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {loading && users.currentUser && this.state.mode === 'update' ? (
            <LoadingModal loading={loading}></LoadingModal>
          ) : (
            <View style={styles.getStartedContainer}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => this.setState({ name: text })}
                value={this.state.name || users.currentUser.name}
              />
              <Text>{users.currentUser.role}</Text>
              <View>
                <Button keyboardShouldPersistTaps="handled" onPress={() => this.submit()}>
                  <Text>submit</Text>
                </Button>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>
        </View>
      </View>
    );
  }
}

UserScreen.navigationOptions = {
  headerTitle: 'User',
};

UserScreen.propTypes = {
  getUserById: PropTypes.func.isRequired,
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
  getUserById,
  updateUser,
  addNewUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScreen);

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
  UserFilename: {
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
