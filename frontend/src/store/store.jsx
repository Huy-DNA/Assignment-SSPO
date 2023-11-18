import { configureStore } from '@reduxjs/toolkit';
import loginStatusReducer from './loginStatus/index';

export default configureStore({
  reducer: {
    loginStatus: loginStatusReducer,
  },
});
