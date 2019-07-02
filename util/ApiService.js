import axios from 'axios';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import NavigationService from '../NavigationService';

const ApiService = options => {
  /**
   * Create axios instance
   *
   * @param {string} url
   */
  const client = async url => {
    let headers = {};
    if (!url.includes('auth')) {
      const token = await AsyncStorage.getItem('token');
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return axios.create({
      baseURL: 'http://localhost:8080/api',
      timeout: 10000,
      headers,
    });
  };

  /**
   * On Success Response
   *
   * @param {object} response
   */
  const onSuccess = response => {
    return response.data;
  };

  /**
   * On Error Response
   *
   * @param {object} response
   */
  const onError = error => {
    if (error.response) {
      if (
        _.get(error, 'response.data.statusCode') === 401 &&
        !_.get(error, 'response.config.url').includes('auth')
      ) {
        AsyncStorage.clear();
        NavigationService.navigate('AuthLoading');
      }
    }

    return Promise.reject(
      _.get(error, 'response.data.error') || 'Something was wrong, Please try again'
    );
  };

  /**
   * Post action
   *
   * @param {String} url
   * @param {Object} data
   */
  const post = async (url, data = {}) => {
    const action = await client(url);

    return action
      .request({
        method: 'POST',
        url,
        data,
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error));
  };

  /**
   * Get action
   *
   * @param {String} url
   * @param {Object} params
   */
  const get = async (url, params = {}) => {
    const action = await client(url);

    return action
      .request({
        method: 'GET',
        url,
        params,
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error));
  };

  /**
   * Delete action
   *
   * @param {String} url
   * @param {Object} params
   */
  const remove = async (url, params = {}) => {
    const action = await client(url);

    return action
      .request({
        method: 'DELETE',
        url,
        params,
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error));
  };

  /**
   * PATCH - update - action
   *
   * @param {String} url
   * @param {Object} data
   */
  const patch = async (url, data = {}) => {
    const action = await client(url);

    return action
      .request({
        method: 'PATCH',
        url,
        data,
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error));
  };

  /**
   * PUT replace - action
   *
   * @param {String} url
   * @param {Object} data
   */
  const put = async (url, data = {}) => {
    const action = await client(url);

    return action
      .request({
        method: 'PATCH',
        url,
        data,
      })
      .then(response => onSuccess(response))
      .catch(error => onError(error));
  };

  return { post, get, remove, put, patch };
};

export default ApiService();
