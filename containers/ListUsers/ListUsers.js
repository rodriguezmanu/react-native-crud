import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { List, ListItem, Right, Body, Icon, Text, Left } from 'native-base';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/users';

class ListUsers extends React.Component {
  /**
   * Go to User page
   *
   * @param {string} id
   */
  deleteUser(id) {
    const { deleteUser } = this.props;

    deleteUser(id);
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

  render() {
    const { data } = this.props;

    return data.length ? (
      <List>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem onPress={() => this.gotoUser(item.id)}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <View>
                  <Icon name="trash" onPress={() => this.deleteUser(item.id)} />
                </View>
              </Right>
            </ListItem>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </List>
    ) : (
      <View>
        <Body>
          <Text>No Content to show</Text>
        </Body>
      </View>
    );
  }
}

ListUsers.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUsers);
