import {
  USERS,
  GET_USER_BY_ID,
  DELETE_USER,
  UPDATE_USER,
  ADD_USER,
  FILTER_NAME_USER,
  UPDATE_MODE,
} from '../constants/ActionsTypes';

const initialState = {
  isAuthenticated: true,
  currentUser: {},
  data: [],
  successMsg: '',
  errorMsg: '',
  loading: false,
  originalUsers: [],
  mode: 'update',
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USERS.REQUESTED:
      return { ...state, loading: true };
    case USERS.SUCCESS:
      return {
        ...state,
        data: payload.response,
        originalUsers: payload.response,
        loading: false,
        errorMsg: '',
      };
    case USERS.ERROR:
      return { ...state, loading: false, errorMsg: payload.error };
    case GET_USER_BY_ID.REQUESTED:
      return { ...state, loading: true };
    case GET_USER_BY_ID.SUCCESS:
      return { ...state, currentUser: payload.response, loading: false, errorMsg: '' };
    case GET_USER_BY_ID.ERROR:
      return { ...state, loading: false, errorMsg: payload.error };
    case DELETE_USER.REQUESTED:
      return { ...state, loading: true };
    case DELETE_USER.SUCCESS:
      return { ...state, data: payload.response, loading: false, errorMsg: '' };
    case DELETE_USER.ERROR:
      return { ...state, loading: false, errorMsg: payload.error };
    case UPDATE_USER.REQUESTED:
      return { ...state, loading: true };
    case UPDATE_USER.SUCCESS:
      return { ...state, loading: false, errorMsg: '' };
    case UPDATE_USER.ERROR:
      return { ...state, loading: false, errorMsg: payload.error };
    case ADD_USER.REQUESTED:
      return { ...state, loading: true };
    case ADD_USER.SUCCESS:
      state.data.push(payload.response);
      return { ...state, loading: false, errorMsg: '' };
    case ADD_USER.ERROR:
      return { ...state, loading: false, errorMsg: payload.error };
    case FILTER_NAME_USER.SUCCESS:
      return {
        ...state,
        loading: false,
        errorMsg: '',
        data: payload.result,
      };
    case UPDATE_MODE.SUCCESS:
      return { ...state, mode: payload.mode };

    default:
      return state;
  }
}
