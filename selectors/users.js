import { createSelector } from 'reselect';

export const getUsers = state => state.users;
export const getUser = state => state.users.currentUser;

export const getUsersData = createSelector(
  getUsers,
  users => users.data
);

export const getUserData = createSelector(
  getUser,
  user => user
);

export const getModeUser = createSelector(
  getUsers,
  users => users.mode
);

export const getLoadingUsers = createSelector(
  getUsers,
  users => users.loading
);
