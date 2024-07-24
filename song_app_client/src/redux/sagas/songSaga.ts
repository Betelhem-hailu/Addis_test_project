import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  addSongSuccess,
  addSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
} from '../slices/songSlice';
// import { Song } from '../../types/songTypes';

function* fetchSongs(action: ReturnType<typeof fetchSongsRequest>) {
  try {
    const { genre, album } = action.payload;
    const response = yield call(axios.get, 'http://localhost:8000/song_app/songs', {
      params: { genre, album },
    });
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* watchFetchSongs() {
  yield takeEvery(fetchSongsRequest.type, fetchSongs);
}

function* addNewSong(action: ReturnType<typeof addSong>) {
  try {
    const response = yield call(axios.post, 'http://localhost:8000/song_app/songs', action.payload);
    yield put(addSongSuccess(response.data));
    yield put(fetchSongsRequest({ genre: '', album: '' })); 
  } catch (error) {
    yield put(addSongFailure(error.message));
  }
}

function* watchAddSong() {
  yield takeLatest(addSong.type, addNewSong);
}

function* updateSongData(action: ReturnType<typeof updateSong>) {
  try {
    const response = yield call(axios.put, `http://localhost:8000/song_app/songs/${action.payload._id}`, action.payload);
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}

function* watchUpdateSong() {
  yield takeLatest(updateSong.type, updateSongData);
}

function* deleteSongData(action: ReturnType<typeof deleteSong>) {
  try {
    const response = yield call(axios.delete, `http://localhost:8000/song_app/songs/${action.payload}`);
    yield put(deleteSongSuccess(response.data));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

function* watchDeleteSong() {
  yield takeLatest(deleteSong.type, deleteSongData);
}


export { watchFetchSongs, watchAddSong, watchUpdateSong, watchDeleteSong };