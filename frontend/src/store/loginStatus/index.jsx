import { createSlice } from '@reduxjs/toolkit';
import { LoginStatus } from '../../constants/loginStatus';
import isLoggedIn from '../../utils/isLoggedIn';
import isManager from '../../utils/isManager';

export const loginStatusSlice = createSlice({
  name: 'loginStatus',
  initialState: {
    value: LoginStatus.NOT_LOGGED_IN,
  },
  reducers: {
    updateStatus: (state) => {
      if (!isLoggedIn()) {
        state.value = LoginStatus.NOT_LOGGED_IN;
        return;
      }
      if (!isManager()) {
        state.value = LoginStatus.USER;
        return;
      }
      state.value = LoginStatus.MANAGER;
      return;
    }
  },
});

export const { updateStatus } = loginStatusSlice.actions

export default loginStatusSlice.reducer