import { combineReducers } from '@reduxjs/toolkit';
import songReducer from './slices/songSlice'; // Import your slices

const rootReducer = combineReducers({
  songs: songReducer,
  // Add other reducers here
});

export default rootReducer;
