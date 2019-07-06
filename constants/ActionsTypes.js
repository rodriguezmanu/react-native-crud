import { createAsyncActionType } from '../util';

export const AUTH_USER = createAsyncActionType('AUTH_USER');
export const USERS = createAsyncActionType('USERS');
export const GET_USER_BY_ID = createAsyncActionType('GET_USER_BY_ID');
export const DELETE_USER = createAsyncActionType('DELETE_USER');
export const UPDATE_USER = createAsyncActionType('UPDATE_USER');
export const ADD_USER = createAsyncActionType('ADD_USER');
export const FILTER_NAME_USER = createAsyncActionType('FILTER_NAME_USER');
export const UPDATE_MODE = createAsyncActionType('UPDATE_MODE');
