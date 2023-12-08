import { createSlice } from '@reduxjs/toolkit';
import { LoginStatus } from '../../constants/loginStatus';
import isLoggedIn from '../../utils/isLoggedIn';
import isManager from '../../utils/isManager';

/**
 *
 */
function getStatus() {
  if (!isLoggedIn()) {
    return LoginStatus.NOT_LOGGED_IN;
  }
  if (!isManager()) {
    return LoginStatus.USER;
  }
  return LoginStatus.MANAGER;
}

export const loginStatusSlice = createSlice({
  name: 'loginStatus',
  initialState: {
    value: getStatus(),
  },
  reducers: {
    updateStatus: (state) => {
    // eslint-disable-next-line no-param-reassign
      state.value = getStatus();
    },
  },
});

export const { updateStatus } = loginStatusSlice.actions;

export default loginStatusSlice.reducer;
