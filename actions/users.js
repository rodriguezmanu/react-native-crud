import {
  USERS,
  GET_USER_BY_ID,
  DELETE_USER,
  UPDATE_USER,
  ADD_USER,
  FILTER_NAME_USER,
  UPDATE_MODE,
} from '../constants/ActionsTypes';
import NavigationService from '../NavigationService';
import { ApiService, errorToastMessage } from '../util';

/**
 * Get user by id from api
 *
 * @param {number} id
 */
export const getUserById = id => dispatch => {
  dispatch({
    type: GET_USER_BY_ID.REQUESTED,
  });

  ApiService.get(`/users/${id}`)
    .then(response => {
      dispatch({
        type: GET_USER_BY_ID.SUCCESS,
        payload: { response },
      });
    })
    .catch(error => {
      dispatch({
        type: GET_USER_BY_ID.ERROR,
        payload: { error },
      });
      errorToastMessage();
    });
};

/**
 * Get all list of users from Api
 *
 * @param {Object} params
 */
export const getUsers = params => dispatch => {
  dispatch({
    type: USERS.REQUESTED,
  });

  ApiService.get('/users', params)
    .then(response => {
      dispatch({
        type: USERS.SUCCESS,
        payload: { response },
      });
    })
    .catch(error => {
      dispatch({
        type: USERS.ERROR,
        payload: { error },
      });

      errorToastMessage();
    });
};

/**
 * Delete user from Api
 *
 * @param {number} id
 */
export const deleteUser = id => dispatch => {
  dispatch({
    type: DELETE_USER.REQUESTED,
  });

  ApiService.remove(`/users/${id}`)
    .then(response => {
      dispatch({
        type: DELETE_USER.SUCCESS,
        payload: { response },
      });
    })
    .catch(error => {
      dispatch({
        type: DELETE_USER.ERROR,
        payload: { error },
      });

      errorToastMessage();
    });
};

/**
 *  Delete user
 *
 * @param {object} user
 */
export const updateUser = user => dispatch => {
  dispatch({
    type: UPDATE_USER.REQUESTED,
  });

  ApiService.patch(`/users/${user.id}`, user)
    .then(response => {
      dispatch({
        type: UPDATE_USER.SUCCESS,
        payload: { response },
      });
    })
    .catch(error => {
      dispatch({
        type: UPDATE_USER.ERROR,
        payload: { error },
      });

      errorToastMessage();
    });
};

/**
 *  Delete user
 *
 * @param {object} user
 */
export const addNewUser = user => dispatch => {
  dispatch({
    type: ADD_USER.REQUESTED,
  });

  ApiService.post(`/users`, user)
    .then(response => {
      dispatch({
        type: ADD_USER.SUCCESS,
        payload: { response },
      });

      dispatch(() => {
        NavigationService.navigate('Home');
      });
    })
    .catch(error => {
      dispatch({
        type: ADD_USER.ERROR,
        payload: { error },
      });

      errorToastMessage();
    });
};

/**
 * Filter users by input text
 *
 * @param {Array} users
 * @param {string} text
 */
export const filterNames = (users, text) => (dispatch, getState) => {
  const userStore = getState().users.originalUsers;
  const result = userStore.filter(({ name }) => name.includes(text));

  dispatch({
    type: FILTER_NAME_USER.SUCCESS,
    payload: { result, users },
  });
};

/**
 * Update mode add or update to redux form initial values
 *
 * @param {string} text
 */
export const updateMode = mode => dispatch => {
  dispatch({
    type: UPDATE_MODE.SUCCESS,
    payload: { mode },
  });
};
