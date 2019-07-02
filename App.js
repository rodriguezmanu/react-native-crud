import React from 'react';
import { Platform, StatusBar, View, AppState } from 'react-native';
import { AppLoading, Asset, Font, Icon, Updates } from 'expo';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import PropTypes from 'prop-types';
import AppNavigator from './navigation/AppNavigator';
import configureStore from './store';
import NavigationService from './NavigationService';
import LoadingModal from './components/LoadingModal/LoadingModal';
import styles from './styles/commonStyles';

const { store } = configureStore();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    updating: false,
  };

  async componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    await this.checkUpdates();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.checkUpdates();
    }
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app,
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // Sentry.captureMessage(`Error - Handling loading ${JSON.stringify(error)}`);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  async checkUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        this.setState({ updating: true });
        await Updates.fetchUpdateAsync();
        Updates.reloadFromCache();
      }
    } catch (e) {
      this.setState({ updating: false });
    }
  }

  render() {
    const { updating, isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (updating) {
      return <LoadingModal loading={updating} title="Updating" />;
    }

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <View style={styles.mainContainer}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Root>
            <AppNavigator
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </Root>
        </View>
      </Provider>
    );
  }
}

App.defaultProps = {
  skipLoadingScreen: false,
};

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};
